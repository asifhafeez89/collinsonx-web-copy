import React, { ReactNode } from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  Image,
  Font,
  Link,
} from '@react-pdf/renderer';
import colors from 'ui/colour-constants';
import { formatDate } from 'utils/DateFormatter';
import { DATE_READABLE_FORMAT } from 'config/Constants';
import { BookingConfirmedPdfProps } from './BookingConfirmationProps';
import { getLogo } from './helpers/getLogo';
import Price from '@components/Price';
import useLocale from 'hooks/useLocale';

Font.register({
  family: 'Open Sans Regular',
  src: 'https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0C4n.ttf',
  fontWeight: 400,
});

Font.register({
  family: 'Open Sans Light',
  src: 'https://fonts.gstatic.com/s/opensans/v36/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsiH0C4n.ttf',
  fontWeight: 300,
});

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Open Sans Light',
    fontSize: 12,
    color: colors.black,
  },
  flex: {
    flexDirection: 'column',
    gap: 4,
    paddingRight: 50,
    paddingBottom: 20,
  },
  bullet: {
    marginHorizontal: 8,
  },
  item: { flexDirection: 'row', marginBottom: 4 },
  view: {
    margin: 25,
  },
  logo: {
    maxWidth: 150,
    width: 'auto',
    height: 'auto',
    alignSelf: 'center',
    marginBottom: 25,
  },
  h1: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Open Sans Regular',
    marginBottom: 12,
  },
  h3: {
    fontSize: 14,
    fontFamily: 'Open Sans Regular',
  },
  strong: {
    fontFamily: 'Open Sans Regular',
  },
  link: {
    color: colors.blue,
  },
  padding: {
    paddingBottom: 10,
  },
  marginTop: {
    marginTop: 12,
  },
});

interface ListItemProps {
  children: ReactNode;
}

const ListItem = ({ children }: ListItemProps) => (
  <View style={[styles.item]}>
    <Text style={[styles.text, styles.bullet]}>•</Text>
    <Text style={styles.text}>{children}</Text>
  </View>
);

interface GuestCountProps {
  label: string;
  count: number;
}

const GuestCount = ({ label, count }: GuestCountProps) => (
  <>
    {label}: <Text style={styles.strong}>{count} </Text>
  </>
);

export const BookingConfirmationPDF = (props: BookingConfirmedPdfProps) => {
  const {
    loungeCode = '',
    bookingId = '',
    linkAccountToken = '',
    locale,
  } = props;
  const cancelBookingUrl = new URL(
    process.env.NEXT_PUBLIC_PRIORITY_PASS_ENDPOINT + '/cancel-booking'
  );

  const translations = useLocale();

  cancelBookingUrl.searchParams.set('loungeCode', loungeCode);
  cancelBookingUrl.searchParams.set('bookingId', bookingId || '');
  cancelBookingUrl.searchParams.set('linkAccountToken', linkAccountToken);
  cancelBookingUrl.searchParams.set('ln', locale);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.view}>
          <Image src={getLogo(props)} style={styles.logo} />
          <Text style={[styles.text, styles.h1]}>
            {translations.booking.confirmationPDF.title}
          </Text>
          <Text style={[styles.text, styles.marginTop, styles.padding]}>
            {translations.booking.confirmationPDF.description.line1}{' '}
            <Text style={styles.strong}>
              {formatDate(
                new Date(`${props.departureTime}`),
                DATE_READABLE_FORMAT,
                translations.booking.flightDetails.localeValue
              )}
            </Text>{' '}
            {translations.booking.confirmationPDF.description.line2}{' '}
            <Text style={styles.strong}>
              {props.lounge?.loungeName},{' '}
              {props.lounge?.location?.terminal &&
                props.lounge?.location?.terminal + ', '}
              {props.lounge?.location?.airportName}
            </Text>{' '}
            {translations.booking.confirmationPDF.description.line3}
          </Text>
          <Text style={[styles.h3, styles.marginTop, styles.padding]}>
            {translations.booking.confirmationPDF.bookingDetails.title}
          </Text>
          <Text style={[styles.text, styles.marginTop, styles.padding]}>
            {translations.booking.confirmationPDF.bookingDetails.reference}{' '}
            <Text style={styles.strong}>{props.reference}</Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            {translations.booking.confirmationPDF.bookingDetails.date}{' '}
            <Text style={styles.strong}>
              {formatDate(
                new Date(`${props.departureTime}`),
                DATE_READABLE_FORMAT,
                translations.booking.flightDetails.localeValue
              )}
            </Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            {translations.booking.confirmationPDF.bookingDetails.flightNumber}{' '}
            <Text style={styles.strong}>{props.flightNumber}</Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            {translations.booking.confirmationPDF.bookingDetails.timeOfArrival}{' '}
            <Text style={styles.strong}>{props.arrival}</Text>
          </Text>

          <Text
            style={[styles.text, styles.h3, styles.marginTop, styles.padding]}
          >
            {translations.booking.confirmationPDF.guestDetails.title}
          </Text>
          <Text style={[styles.text, styles.padding]}>
            <GuestCount
              label={translations.booking.confirmationPDF.guestDetails.adults}
              count={props.adults}
            />
            {props.children > 0 && (
              <GuestCount
                label={
                  translations.booking.confirmationPDF.guestDetails.children
                }
                count={props.children}
              />
            )}{' '}
            {props.infants > 0 && (
              <GuestCount
                label={
                  translations.booking.confirmationPDF.guestDetails.infants
                }
                count={props.infants}
              />
            )}
          </Text>
          <Text
            style={[styles.text, styles.h3, styles.marginTop, styles.padding]}
          >
            {translations.booking.confirmationPDF.price}
          </Text>
          <Text style={[styles.text, styles.padding]}>
            <Price
              lounge={props.lounge}
              guests={{
                adults: props.adults,
                infants: props.infants,
                children: props.children,
              }}
            ></Price>
          </Text>
          <Text
            style={[styles.text, styles.h3, styles.marginTop, styles.padding]}
          >
            {translations.booking.confirmationPDF.importantNotes.title}
          </Text>
          <View style={styles.flex}>
            {translations.booking.confirmationPDF.importantNotes.notes &&
              translations.booking.confirmationPDF.importantNotes.notes.map(
                (note, i) => <ListItem key={i}>{note}</ListItem>
              )}
            <Link
              style={[styles.text, styles.link]}
              src={cancelBookingUrl.toString()}
            >
              {translations.booking.confirmationPDF.cancelText}
            </Link>
          </View>

          <Text style={[styles.text, styles.padding]}>
            {translations.booking.confirmationPDF.forwardText}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

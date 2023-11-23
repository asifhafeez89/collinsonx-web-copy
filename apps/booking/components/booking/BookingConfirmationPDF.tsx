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
  const { loungeCode = '', bookingId = '', linkAccountToken = '' } = props;
  const cancelBookingUrl = new URL(window.location.origin);

  cancelBookingUrl.pathname = 'cancel-booking';
  cancelBookingUrl.searchParams.set('loungeCode', loungeCode);
  cancelBookingUrl.searchParams.set('bookingId', bookingId || '');
  cancelBookingUrl.searchParams.set('linkAccountToken', linkAccountToken);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.view}>
          <Image src={getLogo(props)} style={styles.logo} />
          <Text style={[styles.text, styles.h1]}>Booking Confirmation</Text>
          <Text style={[styles.text, styles.marginTop, styles.padding]}>
            Good news! Your booking for{' '}
            <Text style={styles.strong}>
              {formatDate(
                new Date(`${props.departureTime}`),
                DATE_READABLE_FORMAT
              )}
            </Text>{' '}
            at{' '}
            <Text style={styles.strong}>
              {props.lounge.loungeName},{' '}
              {props.lounge.location?.terminal &&
                props.lounge.location?.terminal + ', '}
              {props.lounge.location?.airportName}
            </Text>{' '}
            has been confirmed.
          </Text>
          <Text style={[styles.h3, styles.marginTop, styles.padding]}>
            Your booking details
          </Text>
          <Text style={[styles.text, styles.marginTop, styles.padding]}>
            Booking reference:{' '}
            <Text style={styles.strong}>{props.reference}</Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            Date:{' '}
            <Text style={styles.strong}>
              {formatDate(
                new Date(`${props.departureTime}`),
                DATE_READABLE_FORMAT
              )}
            </Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            Flight number:{' '}
            <Text style={styles.strong}>{props.flightNumber}</Text>
          </Text>
          <Text style={[styles.text, styles.padding]}>
            Estimated time of arrival:{' '}
            <Text style={styles.strong}>{props.arrival}</Text>
          </Text>

          <Text
            style={[styles.text, styles.h3, styles.marginTop, styles.padding]}
          >
            Who's coming?
          </Text>
          <Text style={[styles.text, styles.padding]}>
            <GuestCount label={'Adults'} count={props.adults} />
            {props.children > 0 && (
              <GuestCount label={'Children'} count={props.children} />
            )}{' '}
            {props.infants > 0 && (
              <GuestCount label={'Infants'} count={props.infants} />
            )}
          </Text>
          <Text
            style={[styles.text, styles.h3, styles.marginTop, styles.padding]}
          >
            Total
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
            Important Notes
          </Text>
          <View style={styles.flex}>
            <ListItem>
              Please remember to bring your booking reference number, boarding
              pass and photo ID along with your Priority Pass membership card or
              eligible access method for check in at the lounge.
            </ListItem>
            <ListItem>
              Maximum stay is 3 hours prior to your flight time.
            </ListItem>
            <ListItem>
              Cancellation must be made at least 48 hours in advance of your
              visit date & time to receive a refund. No refund will be issued
              after this time.{' '}
              <Link
                style={[styles.text, styles.link]}
                // I think the types from @react-pdf/renderer are wrong because href works and is specified in the docs
                // @ts-ignore
                href={cancelBookingUrl.toString()}
              >
                Click here to cancel your booking
              </Link>
            </ListItem>
          </View>

          <Text style={[styles.text, styles.padding]}>
            We look forward to seeing you there!
          </Text>
        </View>
      </Page>
    </Document>
  );
};

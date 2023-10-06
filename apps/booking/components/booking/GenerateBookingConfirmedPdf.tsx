import colors from 'ui/colour-constants';
import React from 'react';
import {
  Document,
  Page,
  Text,
  StyleSheet,
  View,
  PDFDownloadLink,
} from '@react-pdf/renderer';
import { formatDate } from 'utils/DateFormatter';
import { DATE_REDABLE_FORMAT, TIME_FORMAT } from 'config/Constants';
import { Booking } from 'context/bookingContext';
import { Experience } from '@collinsonx/utils';

interface BookingConfirmedPdfProps {
  adults: Booking['adults'];
  arrival: string | undefined;
  children: Booking['children'];
  departureTime: string | Date | undefined | null;
  emailAddress: string | undefined;
  flightNumber: string;
  infants: Booking['infants'];
  lounge: Experience;
  reference: string | undefined;
}

const GeneratedPDF = (props: BookingConfirmedPdfProps) => (
  <Document>
    <Page size="A4">
      <View style={styles.view}>
        <Text style={[styles.h1]}>[Priority Pass] Booking Confirmation</Text>

        <Text style={[styles.marginTop, styles.padding]}>
          Your Booking has been confirmed at:
        </Text>
        <Text style={[styles.p, styles.padding]}>
          {props.lounge.loungeName}, {props.lounge.location?.airportName},{' '}
          {props.lounge.location?.terminal}{' '}
        </Text>

        <Text style={[styles.p, styles.marginTop, styles.padding]}>
          Booking reference {props.reference}
        </Text>

        <Text style={[styles.p, styles.marginTop, styles.padding]}>
          A confirmation email has been sent to
        </Text>
        <Text style={[styles.h3, styles.padding]}>{props.emailAddress}</Text>

        <Text style={[styles.h2, styles.marginTop, styles.padding]}>
          Flight details
        </Text>

        <Text style={[styles.h3, styles.padding]}>Day of flight</Text>
        <Text style={[styles.p, styles.padding]}>
          {formatDate(new Date(`${props.departureTime}`), DATE_REDABLE_FORMAT)}
        </Text>

        <Text style={[styles.h3, styles.padding]}>Time of flight</Text>
        <Text style={[styles.p, styles.padding]}>
          {formatDate(new Date(`${props.departureTime}`), TIME_FORMAT)}
        </Text>

        <Text style={[styles.h3, styles.padding]}>Flight number</Text>
        <Text style={[styles.p, styles.padding]}>{props.flightNumber}</Text>

        <Text style={[styles.h2, styles.marginTop, styles.padding]}>
          Who's coming
        </Text>
        <Text style={[styles.p, styles.padding]}>
          Adults {props.adults}{' '}
          {props.children > 0 && `Children ${props.children}`}{' '}
          {props.infants > 0 && `Infants ${props.infants}`}
        </Text>

        <Text style={[styles.h2, styles.marginTop, styles.padding]}>
          Estimated time of arrival
        </Text>
        <Text style={[styles.p, styles.padding]}>{props.arrival}</Text>
      </View>
    </Page>
  </Document>
);

const styles = StyleSheet.create({
  view: {
    margin: 25,
  },
  h1: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 12,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
  },
  h3: {
    fontSize: 16,
    fontWeight: 700,
  },
  p: {
    fontSize: 16,
  },
  strong: {
    fontWeight: 700,
  },
  padding: {
    paddingBottom: 10,
  },
  marginTop: {
    marginTop: 12,
  },
});

export const GenerateBookingConfirmedPdf = (
  props: BookingConfirmedPdfProps
) => (
  <div
    style={{
      textAlign: 'center',
      padding: '1.25rem',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <PDFDownloadLink
      document={<GeneratedPDF {...props} />}
      fileName={`booking_confirmation_${props.reference}`}
      style={{
        borderRadius: 4,
        fontSize: 18,
        height: '44px',
        backgroundColor: colors.theme,
        padding: '0 18px',
        display: 'flex',
        width: 194,
        textDecoration: 'none',
        alignItems: 'center',
      }}
      className="elIgnore"
      data-testid="submit"
    >
      {({ loading }) =>
        loading ? (
          'Loading document...'
        ) : (
          <span
            style={{
              height: '100%',
              display: 'flex',
              fontWeight: 600,
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.white,
            }}
          >
            DOWNLOAD COPY
          </span>
        )
      }
    </PDFDownloadLink>
  </div>
);

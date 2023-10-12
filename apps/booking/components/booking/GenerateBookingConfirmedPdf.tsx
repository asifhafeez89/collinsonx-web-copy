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
import { DATE_READABLE_FORMAT } from 'config/Constants';
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
        <Text style={[styles.h1]}>Booking Confirmation</Text>

        <Text style={[styles.marginTop, styles.padding]}>
          Good news! Your booking for{' '}
          {formatDate(new Date(`${props.departureTime}`), DATE_READABLE_FORMAT)}
          at {props.lounge.loungeName}, {props.lounge.location?.terminal},{' '}
          {props.lounge.location?.airportName}
          has been confirmed.
        </Text>
        <Text style={[styles.marginTop, styles.padding]}>
          Your booking details
        </Text>
        <Text style={[styles.p, styles.marginTop, styles.padding]}>
          Booking reference: {props.reference}
        </Text>
        <Text style={[styles.p, styles.padding]}>
          Date:{' '}
          {formatDate(new Date(`${props.departureTime}`), DATE_READABLE_FORMAT)}
        </Text>
        <Text style={[styles.p, styles.padding]}>
          Flight number: {props.flightNumber}
        </Text>
        <Text style={[styles.p, styles.padding]}>
          Estimated lounge arrival time: {props.arrival}
        </Text>

        <Text style={[styles.h2, styles.marginTop, styles.padding]}>
          Who's coming?
        </Text>
        <Text style={[styles.p, styles.padding]}>
          Adults {props.adults}{' '}
          {props.children > 0 && `Children ${props.children}`}{' '}
          {props.infants > 0 && `Infants ${props.infants}`}
        </Text>

        <Text style={[styles.p, styles.marginTop, styles.padding]}>
          Please remember to bring your booking reference, boarding pass and
          photo ID for check in at the lounge.
        </Text>

        <Text style={[styles.p, styles.padding]}>
          We look forward to seeing you there!
        </Text>

        <Text style={[styles.h2, styles.marginTop, styles.padding]}>
          Need to cancel?
        </Text>

        <Text style={[styles.p, styles.padding]}>
          You can cancel your booking up to 48 hours before your booking arrival
          time to receive a refund.
        </Text>
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
        height: 'auto',
        backgroundColor: colors.theme,
        padding: '0 18px',
        display: 'flex',
        width: 'auto',
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
              padding: '0.5rem 0',
            }}
          >
            DOWNLOAD BOOKING CONFIRMATION
          </span>
        )
      }
    </PDFDownloadLink>
  </div>
);

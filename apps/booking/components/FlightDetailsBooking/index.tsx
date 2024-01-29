import {
  Box,
  Stack,
  Title,
  Text,
  Flex,
  Anchor,
} from '@collinsonx/design-system/core';
import { Booking, Experience } from '@collinsonx/utils';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import classes from './FlightDetailsBooking.module.css';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { MouseEventHandler, useCallback, useContext } from 'react';
import { BookingContext } from 'context/bookingContext';
import { FlightContext } from 'context/flightContext';
import useLocale from 'hooks/useLocale';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { getItem } from '@collinsonx/utils/lib';
import {
  ANALYTICS_TAGS,
  MOBILE_ACTION_BACK,
  PDF_VERSION_ACCEPTED,
  VERSION,
} from '../../constants';
import ShowButtonByVersion from '@components/ShowDownloadButton';
import { GenerateBookingConfirmedPdf } from '@components/booking/GenerateBookingConfirmedPdf';
import usePayload from 'hooks/payload';
import { logAction, sendMobileEvent } from '@lib';
import colors from '@collinsonx/design-system/colour-constants-baas';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';

interface FlightDetailsBookingProps {
  pageName: string;
  isRefund: Boolean;
}

const FlightDetailsBooking = ({
  pageName,
  isRefund,
}: FlightDetailsBookingProps) => {
  const { getBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);
  const translations = useLocale();
  const version = getItem(VERSION);

  const { flightNumber, children, bookingId, adults, arrival, infants } =
    getBooking();

  const flightData = getFlight();
  const departureTime = flightData?.departure?.dateTime?.local;

  const {
    locale,
    lounge,
    loungeCode,
    referrerUrl,
    consumerData,
    platform,
    jwt,
    payload,
  } = usePayload();

  const handleClickBack: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (window && !referrerUrl) {
        e.preventDefault();
        logAction(pageName, ANALYTICS_TAGS.ON_PAGE_CONFIRMED_BACK_BTN);
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    },
    [referrerUrl]
  );

  const [fetchBookingDetails, { loading: loadingBooking, data: dataBooking }] =
    useLazyQuery<{
      getBookingByID: Booking;
    }>(getBookingByID, {
      variables: {
        getBookingById: bookingId,
      },
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: (data) => {},
    });

  return (
    <>
      <Box className={classes.headingContainer}>
        <Heading
          style={{
            fontSize: '1.5rem',
            lineHeight: '2.25rem',
            fontWeight: '700',
          }}
          as="h2"
          padding={0}
          margin={0}
          lineHeight={1.3}
        >
          <Box className={classes.successfulTitle}>
            {translations.booking.confirmationPayment.outcome.succesful.title}
          </Box>
        </Heading>
        <EditableTitle
          title={
            translations.booking.confirmationPayment.outcome.succesful.reference
              .label
          }
          as="h3"
          showBorder={true}
        >
          {
            translations.booking.confirmationPayment.outcome.succesful.reference
              .label
          }{' '}
          {''} {dataBooking?.getBookingByID.reference}
          <p>
            {
              translations.booking.confirmationPayment.outcome.succesful
                .emailConfirmationLabel
            }{' '}
            <span style={{ fontWeight: 700 }}>
              {consumerData?.getConsumerByID.emailAddress}
            </span>
          </p>
          {isRefund && (
            <div>
              {' '}
              You have decreased the number of guests from your booking. Your
              refund will be processed onto the payment card used to pay for the
              original booking within 10 working days.
            </div>
          )}
        </EditableTitle>
      </Box>
      {!!lounge && (
        <Stack className={classes.details} gap={8}>
          <FlightDetailsAndGuests
            departureTime={departureTime ? departureTime : ''}
            flightNumber={flightNumber}
            guestList={{ adults, infants, children }}
            lounge={lounge}
            noEdit={true}
          />
          <Box className={classes.slotsTitle}>
            <EditableTitle
              title={translations.booking.availableSlots.title}
              as="h2"
              showBorder={true}
            >
              {arrival && <EstimatedTimeArrival arrival={arrival} />}
            </EditableTitle>
          </Box>

          <EditableTitle
            title={
              translations.booking.confirmationPayment.outcome.succesful
                .importantNotes.title
            }
            as="h2"
            showBorder={false}
          >
            <ul style={{ paddingLeft: '1em' }}>
              {translations.booking.confirmationPayment.outcome.succesful.importantNotes.notes.map(
                (note, i) => (
                  <li key="li">{note}</li>
                )
              )}
            </ul>
          </EditableTitle>
        </Stack>
      )}
      <Flex justify={'center'} direction={'column'} align={'center'}>
        {/* <ShowButtonByVersion
          currentVersion={version ?? ''}
          minVersion={PDF_VERSION_ACCEPTED}
        > */}
        <GenerateBookingConfirmedPdf
          adults={adults}
          arrival={arrival}
          children={children}
          departureTime={departureTime}
          emailAddress={consumerData?.getConsumerByID.emailAddress}
          flightNumber={flightNumber}
          infants={infants}
          lounge={lounge}
          locale={locale}
          reference={dataBooking?.getBookingByID.reference}
          bookingId={dataBooking?.getBookingByID.id}
          loungeCode={loungeCode}
          linkAccountToken={jwt}
          accountProvider={payload?.accountProvider}
          membershipType={payload?.membershipType}
          platform={platform}
          analyticsTag={ANALYTICS_TAGS.ON_PAGE_CONFIRMED_BTN_DOWNLOAD}
        />
        {/* </ShowButtonByVersion> */}

        <Anchor
          target="_top"
          href={referrerUrl ? referrerUrl : '#'}
          onClick={handleClickBack}
          style={{
            textDecoration: 'underline',
            color: colors.blue,
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
            fontWeight: '600',
            marginTop: '0.75rem',
          }}
        >
          {
            translations.booking.confirmationPayment.outcome.succesful.btn
              .return
          }
        </Anchor>
      </Flex>
    </>
  );
};

export default FlightDetailsBooking;

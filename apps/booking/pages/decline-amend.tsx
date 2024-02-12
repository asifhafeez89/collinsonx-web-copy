import Heading from '@collinsonx/design-system/components/heading/Heading';
import { Box, Center, Flex, Stack } from '@collinsonx/design-system/core';
import { LoungeInfo } from '@components/LoungeInfo';
import useLocale from 'hooks/useLocale';
import classes from '../styles/ConfirmPayment.module.css';
import usePayload from 'hooks/payload';
import Layout from '@components/Layout';
import { BOOKING_MODE } from '../constants';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import router from 'next/router';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import { useEffect } from 'react';
import { Booking } from '@collinsonx/utils';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import dayjs from 'dayjs';
import ErrorNotification from '@collinsonx/design-system/components/errorNotification';

export default function ConfirmAmendment() {
  const translations = useLocale();
  const { lounge, consumerData } = usePayload();
  const { bookingId } = BookingQueryParams;
  const { [bookingId]: emailBookingId } = router.query;

  useEffect(() => {
    fetchBookingDetails();
  }, []);

  const [fetchBookingDetails, { data: dataBooking }] = useLazyQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: {
      getBookingById: emailBookingId,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {},
  });

  return (
    <Layout>
      <Stack gap={10} className={classes.nonLayoutGapTop}>
        <Flex
          justify="center"
          align="center"
          direction="column"
          className={classes.containerOuter}
        >
          <Stack className={classes.containerInner}>
            <Center className={classes.titleContainer}>
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                {translations.booking.confirmationPayment.amendTitle}
              </Heading>
            </Center>

            <Box className={classes.loungeInfo}>
              <LoungeInfo lounge={lounge} loading={!lounge} hideImageMobile />
            </Box>
            <ErrorNotification
              content={translations.booking.declineAmend.title}
            />
            {
              <Box className={classes.headingContainer}>
                <EditableTitle
                  title={
                    translations.booking.confirmationPayment.outcome.succesful
                      .reference.label
                  }
                  as="h3"
                  showBorder={true}
                >
                  {
                    translations.booking.confirmationPayment.outcome.succesful
                      .reference.label
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
                  {
                    <div className={classes.refundText}>
                      {' '}
                      {
                        translations.booking.confirmationPayment.outcome
                          .succesful.refundText
                      }
                    </div>
                  }
                </EditableTitle>
              </Box>
            }

            {!!lounge && (
              <Stack className={classes.details} gap={8}>
                <FlightDetailsAndGuests
                  departureTime={dataBooking?.getBookingByID.bookedTo}
                  flightNumber={
                    dataBooking?.getBookingByID?.metadata.flightNumber
                  }
                  guestList={{
                    adults: dataBooking?.getBookingByID.guestAdultCount ?? 0,
                    children:
                      dataBooking?.getBookingByID.guestChildrenCount ?? 0,
                    infants: dataBooking?.getBookingByID.guestInfantCount ?? 0,
                  }}
                  lounge={lounge}
                  noEdit={true}
                  mode={BOOKING_MODE.CREATE}
                  currentPrice={dataBooking?.getBookingByID.price ?? 0}
                  confirmationDisplay={true}
                />

                <Box className={classes.slotsTitle}>
                  <EditableTitle
                    title={translations.booking.availableSlots.title}
                    as="h2"
                    showBorder={false}
                  >
                    <EstimatedTimeArrival
                      arrival={`${dayjs(
                        dataBooking?.getBookingByID?.bookedFrom
                      ).format('HH:mm')} - ${dayjs(
                        dataBooking?.getBookingByID?.lastArrival
                      ).format('HH:mm')}`}
                    />
                  </EditableTitle>
                </Box>
              </Stack>
            )}
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

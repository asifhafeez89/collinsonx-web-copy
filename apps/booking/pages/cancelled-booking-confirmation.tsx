import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Center, Flex, Stack, Text } from '@collinsonx/design-system/core';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { LoungeInfoPreBooked } from '@components/LoungeInfoPreBooked';
import { BookingStatus } from '@collinsonx/utils/generatedTypes/graphql';
import usePayload from 'hooks/payload';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { GetAccountProviderString } from 'utils/GetAccountProviderString';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { arrivalTimeFormatter } from 'utils/ArrivalTimeFormatter';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import useLocale from 'hooks/useLocale';

import classes from '../styles/CancelBooking.module.css';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';

export default function CancelBooking() {
  const router = useRouter();
  const { bookingId: emailBookingId } = router.query;
  const { payload } = usePayload();
  const translations = useLocale();

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  if (!bookingDetails) {
    return (
      <Layout>
        <Flex justify="center" align="center" h="100%" gap={30}>
          <LoaderLifestyleX />
        </Flex>
      </Layout>
    );
  }

  const {
    price,
    bookedFrom,
    lastArrival,
    experience,
    bookedTo,
    metadata,
    guestAdultCount,
    guestChildrenCount,
    guestInfantCount,
    reference,
    consumer,
    status,
    refundStatus,
  } = bookingDetails?.getBookingByID;

  const arrival = arrivalTimeFormatter(bookedFrom, lastArrival);

  return (
    <Layout>
      <Stack gap={16} w="100%">
        <Flex
          justify="center"
          align="center"
          direction="column"
          className={classes.containerL1}
        >
          <Stack gap={8} className={classes.confirmCancelContainer}>
            <Center className={classes.headingWrapper}>
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                {translations.booking.cancellation.title}
              </Heading>
            </Center>
            {price && experience && (
              <LoungeInfoPreBooked
                hideImageMobile
                lounge={experience}
                loading={!experience}
              />
            )}
            <Flex className={classes.detailsContainer}>
              <Box className={classes.detailsContainerL2}>
                {experience && (
                  <Stack gap={0}>
                    <Box className={classes.titleContainerCancelConfirm}>
                      <EditableTitle title="" as="h3" showBorder={false}>
                        <h2>
                          {' '}
                          {status === BookingStatus.Cancelled
                            ? translations.booking.cancellation.confirmation
                                .title.Cancel
                            : status === BookingStatus.CancelationFailed
                            ? translations.booking.cancellation.confirmation
                                .title.Failed
                            : translations.booking.cancellation.confirmation
                                .title.NotCancel}
                        </h2>
                      </EditableTitle>
                    </Box>
                    <Box className={classes.titleContainer}>
                      <EditableTitle
                        title={translations.booking.cancellation.reference}
                        as="h3"
                        showBorder={false}
                      >
                        {reference}
                      </EditableTitle>
                      {consumer && (
                        <Text className={classes.descriptionText}>
                          {translations.booking.cancellation.confirmation.email}{' '}
                          <strong>{consumer.emailAddress}</strong>
                        </Text>
                      )}
                      <Box className={classes.descriptionText}>
                        {refundStatus === 'failed' ? (
                          <Text fw={400} py={22}>
                            {
                              translations.booking.cancellation.confirmation
                                .refund.failed
                            }
                          </Text>
                        ) : (
                          <Text fw={700} py={22}>
                            {
                              translations.booking.cancellation.confirmation
                                .refund.successful
                            }
                          </Text>
                        )}

                        <Text>
                          {
                            translations.booking.cancellation.confirmation
                              .reBook.line1
                          }
                          {GetAccountProviderString(payload?.accountProvider)}
                          {
                            translations.booking.cancellation.confirmation
                              .reBook.line2
                          }
                        </Text>
                      </Box>
                    </Box>
                    <FlightDetailsAndGuests
                      departureTime={bookedTo ?? ''}
                      flightNumber={metadata?.flightNumber}
                      guestList={{
                        adults: guestAdultCount,
                        infants: guestInfantCount,
                        children: guestChildrenCount,
                      }}
                      lounge={experience}
                      noEdit={true}
                    />
                    <Box className={classes.titleContainer}>
                      <EditableTitle
                        title={translations.booking.availableSlots.title}
                        as="h3"
                        showBorder={true}
                      >
                        {bookedFrom && lastArrival && (
                          <EstimatedTimeArrival arrival={arrival} />
                        )}
                      </EditableTitle>
                    </Box>
                  </Stack>
                )}
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

CancelBooking.getLayout = (page: JSX.Element) => <>{page}</>;

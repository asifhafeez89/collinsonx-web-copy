import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Center, Flex, Stack, Text } from '@collinsonx/design-system/core';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Details } from '@collinsonx/design-system';
import { useState } from 'react';
import { TIME_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { LoungeInfoPreBooked } from '@components/LoungeInfoPreBooked';
import Price from '@components/Price';
import { BookingStatus } from '@collinsonx/utils/generatedTypes/graphql';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '@components/guest-count/GuestCount';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { GetAccountProviderString } from 'utils/GetAccountProviderString';
import { guestBooking } from 'utils/guestListFormatter';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { arrivalTimeFormatter } from 'utils/ArrivalTimeFormatter';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import useLocale from 'hooks/useLocale';

import classes from '../styles/CancelBooking.module.css';

export default function CancelBooking() {
  const router = useRouter();

  const { bookingId: emailBookingId } = router.query;

  const [createLoading, setCreateLoading] = useState(false);
  const { payload, setPayload } = usePayload();
  const translations = useLocale();

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  const arrival = arrivalTimeFormatter(
    bookingDetails?.getBookingByID?.bookedFrom,
    bookingDetails?.getBookingByID.lastArrival
  );

  return (
    <Layout>
      {bookingDetails ? (
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
              {bookingDetails?.getBookingByID?.price &&
                bookingDetails.getBookingByID.experience && (
                  <LoungeInfoPreBooked
                    hideImageMobile
                    lounge={bookingDetails.getBookingByID.experience}
                    loading={!bookingDetails.getBookingByID.experience}
                  />
                )}
              {createLoading ? (
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  gap={{ base: 'sm', sm: 'lg' }}
                  justify={{ sm: 'center' }}
                ></Flex>
              ) : (
                <Flex className={classes.detailsContainer}>
                  {
                    <Box className={classes.detailsContainerL2}>
                      {bookingDetails.getBookingByID.experience && (
                        <Stack gap={0}>
                          <Box className={classes.titleContainerCancelConfirm}>
                            <EditableTitle title="" as="h3" showBorder={false}>
                              <h2>
                                {' '}
                                {bookingDetails.getBookingByID.status ===
                                BookingStatus.Cancelled
                                  ? translations.booking.cancellation
                                      .confirmation.title.Cancel
                                  : bookingDetails.getBookingByID.status ===
                                    BookingStatus.CancelationFailed
                                  ? translations.booking.cancellation
                                      .confirmation.title.Failed
                                  : translations.booking.cancellation
                                      .confirmation.title.NotCancel}
                              </h2>
                            </EditableTitle>
                          </Box>
                          <Box className={classes.titleContainer}>
                            <EditableTitle
                              title={
                                translations.booking.cancellation.reference
                              }
                              as="h3"
                              showBorder={false}
                            >
                              {bookingDetails?.getBookingByID?.reference}
                            </EditableTitle>
                            {bookingDetails?.getBookingByID?.consumer && (
                              <Text className={classes.descriptionText}>
                                {
                                  translations.booking.cancellation.confirmation
                                    .email
                                }{' '}
                                <strong>
                                  {
                                    bookingDetails?.getBookingByID?.consumer
                                      .emailAddress
                                  }
                                </strong>
                              </Text>
                            )}
                            <Box className={classes.descriptionText}>
                              <Text fw={700} py={22}>
                                {
                                  translations.booking.cancellation.confirmation
                                    .refund
                                }
                              </Text>
                              <Text>
                                {
                                  translations.booking.cancellation.confirmation
                                    .reBook.line1
                                }
                                {GetAccountProviderString(
                                  payload?.accountProvider
                                )}
                                {
                                  translations.booking.cancellation.confirmation
                                    .reBook.line2
                                }
                              </Text>
                            </Box>
                          </Box>
                          <FlightDetailsAndGuests
                            departureTime={
                              bookingDetails?.getBookingByID?.bookedTo
                                ? bookingDetails?.getBookingByID?.bookedTo
                                : ''
                            }
                            flightNumber={
                              bookingDetails?.getBookingByID?.metadata
                                ?.flightNumber
                            }
                            guestList={guestBooking(
                              bookingDetails?.getBookingByID
                            )}
                            lounge={bookingDetails?.getBookingByID?.experience}
                            noEdit={true}
                          />
                          <Box w="initial" className={classes.titleContainer}>
                            <EditableTitle
                              title={
                                translations.booking.availableSlots.totalPrice
                                  .title
                              }
                              as="h3"
                              showBorder={false}
                            >
                              <Price
                                lounge={
                                  bookingDetails?.getBookingByID?.experience
                                }
                                guests={{
                                  adults:
                                    bookingDetails?.getBookingByID
                                      ?.guestAdultCount,
                                  infants:
                                    bookingDetails?.getBookingByID
                                      ?.guestInfantCount,
                                  children:
                                    bookingDetails?.getBookingByID
                                      ?.guestChildrenCount,
                                }}
                              ></Price>
                            </EditableTitle>
                          </Box>
                          <Box className={classes.titleContainer}>
                            <EditableTitle
                              title={translations.booking.availableSlots.title}
                              as="h3"
                              showBorder={true}
                            >
                              {bookingDetails?.getBookingByID?.bookedFrom &&
                                bookingDetails?.getBookingByID?.lastArrival && (
                                  <EstimatedTimeArrival arrival={arrival} />
                                )}
                            </EditableTitle>
                          </Box>
                        </Stack>
                      )}
                    </Box>
                  }
                </Flex>
              )}
            </Stack>
          </Flex>
        </Stack>
      ) : (
        <Stack>
          <Box>{translations.booking.cancellation.confirmation.loading}...</Box>
        </Stack>
      )}
    </Layout>
  );
}

CancelBooking.getLayout = (page: JSX.Element) => <>{page}</>;

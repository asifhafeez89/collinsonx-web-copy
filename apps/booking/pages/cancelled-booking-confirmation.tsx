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

export default function CancelBooking() {
  const router = useRouter();

  const { bookingId: emailBookingId } = router.query;

  const [createLoading, setCreateLoading] = useState(false);
  const { payload, setPayload } = usePayload();

  console.log(payload?.accountProvider);
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
        <Stack spacing={16} sx={{ width: '100%' }}>
          <Flex
            justify="center"
            align="center"
            direction="column"
            sx={{
              justifyContent: 'center',

              '@media (max-width: 768px)': {
                width: '100%',
                justifyContent: 'initial',

                backgroundColor: colors.background,
              },
            }}
          >
            <Stack
              spacing={8}
              sx={{
                width: '591px',
                marginTop: '1rem',

                '@media (max-width: 768px)': {
                  width: '100%',
                  margin: '0',
                  marginTop: '1rem',
                },
              }}
            >
              <Center
                sx={{
                  padding: '10px',
                  margin: '0',
                  '@media (min-width: 768px)': {
                    display: 'none',
                  },
                }}
              >
                <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                  Booking Cancellation
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
                <Flex
                  sx={{
                    width: '100%',
                    flexDirection: 'row',

                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  {
                    <Box
                      sx={{
                        width: '100%',
                        '@media (max-width: 768px)': {
                          width: '100%',
                          gap: '0px',
                          border: 'none',
                        },
                      }}
                    >
                      {bookingDetails.getBookingByID.experience && (
                        <Stack spacing={0}>
                          <Box
                            sx={{
                              '@media (max-width: 768px)': {
                                backgroundColor: colors.white,
                                padding: '0 1.2rem',
                              },
                            }}
                          >
                            <EditableTitle title="" as="h3" showBorder={false}>
                              <h2>
                                {' '}
                                {bookingDetails.getBookingByID.status ===
                                BookingStatus.Cancelled
                                  ? ' Your booking has been cancelled'
                                  : bookingDetails.getBookingByID.status ===
                                    BookingStatus.CancelationFailed
                                  ? 'Your booking cancellation has failed, please contact our team'
                                  : 'Your booking could not be cancelled, please contact our team'}
                              </h2>
                            </EditableTitle>
                          </Box>
                          <Box
                            sx={{
                              '@media (max-width: 768px)': {
                                marginTop: '0.5rem',
                                backgroundColor: colors.white,
                                padding: '1.2rem',
                              },
                            }}
                          >
                            <EditableTitle
                              title="Booking Reference:"
                              as="h3"
                              showBorder={false}
                            >
                              {bookingDetails?.getBookingByID?.reference}
                            </EditableTitle>
                            {bookingDetails?.getBookingByID?.consumer && (
                              <Text
                                sx={{
                                  '@media (max-width: 768px)': {
                                    paddingLeft: '1.25rem',
                                  },
                                }}
                              >
                                A confirmation email has been sent to{' '}
                                <strong>
                                  {
                                    bookingDetails?.getBookingByID?.consumer
                                      .emailAddress
                                  }
                                </strong>
                              </Text>
                            )}
                            <Box
                              sx={{
                                '@media (max-width: 768px)': {
                                  paddingLeft: '1.25rem',
                                },
                              }}
                            >
                              <Text fw={700} py={22}>
                                Your payment for this booking will be refunded
                                within 10 days.
                              </Text>
                              <Text>
                                {`If you didn’t mean to cancel please re-book
                                through ${GetAccountProviderString(
                                  payload?.accountProvider
                                )}. We hope to see you next
                                time.`}
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
                          <Box
                            sx={{
                              width: 'initial',

                              '@media (max-width: 768px)': {
                                margin: '0.5rem 0',
                                backgroundColor: colors.white,
                                padding: '1.2rem',
                              },
                            }}
                          >
                            <EditableTitle
                              title="Total price"
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
                          <Box
                            sx={{
                              '@media (max-width: 768px)': {
                                marginTop: '0.5rem',
                                backgroundColor: colors.white,
                                padding: '1.2rem',
                              },
                            }}
                          >
                            <EditableTitle
                              title="Estimated time of arrival"
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
          <Box>Loading...</Box>
        </Stack>
      )}
    </Layout>
  );
}

CancelBooking.getLayout = (page: JSX.Element) => <>{page}</>;
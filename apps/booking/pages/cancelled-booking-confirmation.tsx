import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack, Text } from '@collinsonx/design-system/core';
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
import priceToDisplay from 'utils/PriceToDisplay';
import colors from 'ui/colour-constants';
import { InfoPanel } from 'utils/PanelInfo';
import BackToLounge from '@components/BackToLounge';
import { GuestCount } from '@components/guests/GuestCount';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';

export default function CancelBooking() {
  const router = useRouter();

  const { bookingId: emailBookingId } = router.query;

  const [createLoading, setCreateLoading] = useState(false);

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

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
              spacing={12}
              sx={{
                width: '591px',

                '@media (max-width: 768px)': {
                  width: '100%',
                  margin: '0',
                },
              }}
            >
              {bookingDetails?.getBookingByID?.price &&
                bookingDetails.getBookingByID.experience && (
                  <LoungeInfoPreBooked
                    price={priceToDisplay(
                      bookingDetails?.getBookingByID?.price
                    )}
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
                          gap: '0.5rem',
                          border: 'none',
                        },
                      }}
                    >
                      {bookingDetails.getBookingByID.experience && (
                        <Stack spacing={8}>
                          <Box
                            sx={{
                              '@media (max-width: 768px)': {
                                marginTop: '0.5rem',
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
                                  ? ' Your Booking has been cancelled'
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
                                  padding: '1.25rem ',
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
                              title="Flight details"
                              as="h3"
                              showBorder={true}
                            >
                              <Details
                                infos={
                                  InfoPanel(
                                    bookingDetails?.getBookingByID?.bookedTo,
                                    bookingDetails?.getBookingByID?.metadata
                                      ?.flightNumber
                                  ) as InfoGroup[]
                                }
                                direction="row"
                              />
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
                              title="Who's coming?"
                              as="h3"
                              showBorder={false}
                            >
                              <GuestCount
                                adults={
                                  bookingDetails.getBookingByID.guestAdultCount
                                }
                                children={
                                  bookingDetails.getBookingByID
                                    .guestChildrenCount
                                }
                                infants={
                                  bookingDetails.getBookingByID.guestInfantCount
                                }
                              />
                            </EditableTitle>
                          </Box>
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
                              showBorder={false}
                            >
                              <p style={{ padding: '0', margin: '0' }}>
                                Timeslots are shown in the time zone of the
                                lounge location
                              </p>
                              <Flex
                                direction={{ base: 'column', sm: 'row' }}
                                gap={10}
                              >
                                <p style={{ padding: '0', margin: '0' }}>
                                  {' '}
                                  {formatDate(
                                    new Date(
                                      `${bookingDetails?.getBookingByID.bookedFrom}`
                                    ),
                                    TIME_FORMAT
                                  )}{' '}
                                  -{' '}
                                  {formatDate(
                                    new Date(
                                      `${bookingDetails?.getBookingByID.lastArrival}`
                                    ),
                                    TIME_FORMAT
                                  )}
                                </p>{' '}
                              </Flex>
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

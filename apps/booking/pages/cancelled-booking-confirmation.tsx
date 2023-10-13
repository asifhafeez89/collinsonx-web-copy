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
import Heading from '@collinsonx/design-system/components/heading/Heading';
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
          <BackToLounge />

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
                          <Box
                            sx={{
                              '@media (max-width: 768px)': {
                                width: '100%',
                                marginTop: '0rem',
                                border: 'none',
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

                          <EditableTitle title="  Who's coming?" as="h2">
                            <p style={{ marginTop: '0px' }}>
                              You can book up to 5 people
                            </p>
                            <GuestCount
                              adults={
                                bookingDetails.getBookingByID.guestAdultCount
                              }
                              children={
                                bookingDetails.getBookingByID.guestChildrenCount
                              }
                              infants={
                                bookingDetails.getBookingByID.guestInfantCount
                              }
                            />
                          </EditableTitle>

                          <EditableTitle
                            title="Estimated time of arrival"
                            as="h3"
                            showBorder={false}
                          >
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

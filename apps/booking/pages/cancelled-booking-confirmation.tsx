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
              spacing={24}
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
                  gap={{ base: 'sm', sm: 'lg' }}
                  sx={{
                    width: '100%',
                    flexDirection: 'row',

                    '@media (max-width: 768px)': {
                      flexDirection: 'column',
                    },
                  }}
                >
                  {
                    <Box sx={{ width: '100%' }}>
                      {bookingDetails.getBookingByID.experience && (
                        <Stack spacing={8} sx={{ padding: '20px' }}>
                          <Heading as="h1" margin={0} padding={0}>
                            {bookingDetails.getBookingByID.status ===
                            BookingStatus.Cancelled
                              ? ' Your Booking has been cancelled'
                              : bookingDetails.getBookingByID.status ===
                                BookingStatus.CancelationFailed
                              ? 'Your booking cancellation has failed, please contact our team'
                              : 'Your booking could not be cancelled, please contact our team'}
                          </Heading>
                          <Heading as="h2" margin={0} padding={0}>
                            Cancellation Policy
                          </Heading>
                          <Text mb={32}>
                            Cancel up to 48 hours before your booking to receive
                            a full refund. Bookings cannot be cancelled within
                            48 hours of booking arrival time, including new
                            bookings made within that time range.
                          </Text>
                          <Heading as="h4" margin={0} padding={0}>
                            Booking Reference: <strong>{emailBookingId}</strong>
                          </Heading>
                          <Text>
                            {bookingDetails.getBookingByID.status ===
                            BookingStatus.Cancelled
                              ? 'A confimation email has been sent to '
                              : 'An email has been sent to '}
                            <strong>
                              {
                                bookingDetails.getBookingByID.consumer
                                  ?.emailAddress
                              }
                            </strong>
                          </Text>

                          <Heading as="h2" margin={0} padding={0}>
                            Flight details
                          </Heading>
                          <Details
                            infos={
                              InfoPanel(
                                bookingDetails?.getBookingByID?.bookedFrom,
                                bookingDetails?.getBookingByID?.metadata
                                  ?.flightNumber
                              ) as InfoGroup[]
                            }
                            direction="row"
                          />

                          <Heading as="h2" margin={0} padding={0}>
                            Who's coming
                          </Heading>
                          <Flex direction="row" gap={10}>
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              <strong>Adults</strong>{' '}
                              {bookingDetails.getBookingByID.guestAdultCount}
                            </p>{' '}
                            {Number(
                              bookingDetails.getBookingByID.guestChildrenCount
                            ) > 0 && (
                              <>
                                <p style={{ padding: '0', margin: '0' }}>
                                  {' '}
                                  <strong>Children</strong>{' '}
                                  {
                                    bookingDetails.getBookingByID
                                      .guestChildrenCount
                                  }
                                </p>
                              </>
                            )}
                          </Flex>

                          <Heading as="h2" margin={0} padding={0}>
                            Estimated time of arrival
                          </Heading>
                          <Flex
                            direction={{ base: 'column', sm: 'row' }}
                            gap={10}
                          >
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              {formatDate(
                                new Date(
                                  `${bookingDetails.getBookingByID.bookedFrom}`
                                ),
                                TIME_FORMAT
                              )}
                            </p>{' '}
                          </Flex>
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

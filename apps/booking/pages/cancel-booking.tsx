import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import Breadcramp from '@components/Breadcramp';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import colors from 'ui/colour-constants';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';

import { cancelBooking } from '@collinsonx/utils/mutations';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useState } from 'react';

import { TIME_FORMAT, DATE_REDABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { FAQLink } from 'utils/FAQLinks';
import { LoungeInfoPreBooked } from '@components/LoungeInfoPreBooked';
import Heading from '@collinsonx/design-system/components/heading/Heading';

export default function CancelBooking() {
  const router = useRouter();

  const { id: emailBookingId } = router.query;

  const [createLoading, setCreateLoading] = useState(false);

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  if (bookingDetails) {
    const {
      id: bookingId,
      bookedFrom,
      bookedTo,
      consumer,
      experience,
      guestAdultCount,
      guestChildrenCount,
      metadata,
      price,
      status,
    } = bookingDetails.getBookingByID;
  }

  const [mutate, { loading: cbLoading, error: cbError }] =
    useMutation(cancelBooking);

  const handleCancellation = () => {
    mutate({
      variables: { cancelBookingId: emailBookingId },
      onCompleted(data) {
        router.push({
          pathname: '/cancelled-booking-confirmation',
          query: { id: emailBookingId },
        });
      },
    });
  };

  const priceToDisplay = bookingDetails?.getBookingByID.price
    ? Number(
        bookingDetails.getBookingByID.price
          .toString()
          .substring(
            0,
            bookingDetails.getBookingByID.price.toString().length - 2
          )
      ).toFixed(2)
    : '0';

  const infos = [
    {
      header: 'Day of flight',
      description: formatDate(
        new Date(`${bookingDetails?.getBookingByID.bookedFrom}`),
        DATE_REDABLE_FORMAT
      ),
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Time of flight',
      description: formatDate(
        new Date(`${bookingDetails?.getBookingByID.bookedFrom}`),
        TIME_FORMAT
      ),
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Flight number',
      description: bookingDetails?.getBookingByID.metadata.flightNumber,
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <Layout>
      {bookingDetails ? (
        <Stack spacing={16} sx={{ width: '100%' }}>
          <Breadcramp
            lefttitle={`BACK TO ${
              bookingDetails.getBookingByID.experience?.loungeName?.toUpperCase() ||
              'Lounges'
            }`}
            lefturl="/"
            righttile={`FAQs`}
            righturl={FAQLink('PRIORITY_PASS')}
          />

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
              {bookingDetails && bookingDetails.getBookingByID.experience && (
                <LoungeInfoPreBooked
                  price={priceToDisplay}
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
                          <Heading as="h2" margin={0} padding={0}>
                            Flight details
                          </Heading>
                          <Details
                            infos={infos as InfoGroup[]}
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

                      <Button
                        py={8}
                        variant="outline"
                        handleClick={handleCancellation}
                        align="center"
                        styles={{
                          root: {
                            border: 'solid',
                            backgroundColor: 'transparent',
                            borderColor: colors.red,
                            borderWidth: 2,
                            color: colors.red,
                            ':hover': {
                              backgroundColor: 'lightgray',
                            },
                          },
                          label: {
                            color: colors.red,
                          },
                        }}
                      >
                        CANCEL BOOKING
                      </Button>
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

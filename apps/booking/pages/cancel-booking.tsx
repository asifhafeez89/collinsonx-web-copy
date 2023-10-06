import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack, Text } from '@collinsonx/design-system/core';
import Breadcramp from '@components/Breadcramp';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import cancellationDateValidation from '@collinsonx/utils/lib/validateDateCancellation';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import colors from 'ui/colour-constants';

import { cancelBooking } from '@collinsonx/utils/mutations';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useState } from 'react';

import { TIME_FORMAT, DATE_REDABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { FAQLink } from 'utils/FAQLinks';
import { LoungeInfoPreBooked } from '@components/LoungeInfoPreBooked';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import Lightbox from '@collinsonx/design-system/components/lightbox';
import { useDisclosure } from '@collinsonx/design-system/hooks';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Price from '@components/Price';
import Notification from '@components/Notification';
import { InfoPanel } from 'utils/PanelInfo';
import { LoungeInfo } from '@components/LoungeInfo';
import BackToLounge from '@components/BackToLounge';

const { bookingId } = BookingQueryParams;

export default function CancelBooking() {
  const router = useRouter();

  const { [bookingId]: emailBookingId } = router.query;

  const [createLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [dateError, setDateError] = useState<Boolean>(false);

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  const [mutate, { loading: cbLoading, error: cbError }] =
    useMutation(cancelBooking);

  const handleCancellation = () => {
    if (
      bookingDetails &&
      cancellationDateValidation(
        new Date(bookingDetails.getBookingByID.bookedFrom)
      ).isValid
    ) {
      mutate({
        variables: { cancelBookingId: emailBookingId },
        onCompleted(data) {
          router.push({
            pathname: '/cancelled-booking-confirmation',
            query: { id: emailBookingId },
          });
        },
      });
    } else {
      setDateError(true);
      close();
    }
  };

  return (
    <Layout>
      {bookingDetails ? (
        <Stack spacing={16} sx={{ width: '100%' }}>
          <BackToLounge />

          <Lightbox
            open={opened}
            title=""
            ctaForwardCall={handleCancellation}
            ctaForward="CANCEL BOOKING"
            ctaCancel={'RETURN'}
            onClose={close}
            cancelModal={true}
          >
            <Flex align="center" justify="center" wrap="wrap">
              <Heading
                as="h2"
                margin={0}
                padding={0}
                style={{ textAlign: 'center' }}
              >
                Booking Cancellation
              </Heading>
              <Text size={20} m={'10px 0 10px 0'} sx={{ textAlign: 'center' }}>
                You are about to cancel the booking, are you sure?{' '}
              </Text>
            </Flex>
          </Lightbox>

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
              <LoungeInfo
                guests={{
                  adults: bookingDetails?.getBookingByID?.guestAdultCount,
                  infants: bookingDetails?.getBookingByID?.guestInfantCount,
                  children: bookingDetails?.getBookingByID?.guestChildrenCount,
                }}
                lounge={bookingDetails?.getBookingByID?.experience ?? undefined}
                loading={!bookingDetails?.getBookingByID?.experience}
              />
              {dateError && bookingDetails && (
                <Notification>
                  {
                    cancellationDateValidation(
                      new Date(bookingDetails.getBookingByID.bookedFrom)
                    ).error
                  }
                </Notification>
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
                      {bookingDetails?.getBookingByID?.experience && (
                        <Stack spacing={8} sx={{ padding: '20px' }}>
                          <Heading as="h2" margin={0} padding={0}>
                            Booking Refence:{' '}
                            {bookingDetails?.getBookingByID?.reference}
                          </Heading>
                          <Heading as="h2" margin={0} padding={0}>
                            Flight details
                          </Heading>
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

                          <Flex
                            direction={{ base: 'column', lg: 'row' }}
                            justify={'space-between'}
                            sx={{
                              width: '87%',

                              '@media (max-width: 768px)': {
                                width: '100%',
                              },
                            }}
                          >
                            <EditableTitle title="Who's coming" as="h2">
                              <Flex direction="row" gap={10}>
                                <Flex sx={{ width: '60%' }} gap={10}>
                                  <p style={{ padding: '0', margin: '0' }}>
                                    {' '}
                                    <strong>Adults</strong>{' '}
                                    {
                                      bookingDetails?.getBookingByID
                                        ?.guestAdultCount
                                    }
                                  </p>{' '}
                                  {Number(
                                    bookingDetails?.getBookingByID
                                      ?.guestInfantCount
                                  ) > 0 ? (
                                    <>
                                      <p style={{ padding: '0', margin: '0' }}>
                                        {' '}
                                        <strong>Children</strong>{' '}
                                        {
                                          bookingDetails?.getBookingByID
                                            ?.guestChildrenCount
                                        }
                                      </p>
                                    </>
                                  ) : null}
                                </Flex>
                              </Flex>
                            </EditableTitle>
                            <Box
                              sx={{
                                width: 'initial',

                                '@media (max-width: 768px)': {
                                  marginTop: '0.5rem',
                                },
                              }}
                            >
                              <EditableTitle title="Total price" as="h2">
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
                                  `${bookingDetails?.getBookingByID?.bookedFrom}`
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
                        handleClick={open}
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

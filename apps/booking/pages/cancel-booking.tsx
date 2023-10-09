import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Flex, Stack, Text } from '@collinsonx/design-system/core';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import cancellationDateValidation from '@collinsonx/utils/lib/validateDateCancellation';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';
import colors from 'ui/colour-constants';
import { cancelBooking } from '@collinsonx/utils/mutations';
import { useState } from 'react';
import { TIME_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import { InfoGroup } from '@collinsonx/design-system/components/details';
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

import { BookingError } from '../constants';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';

const {
  ERR_BOOKING_NOT_FOUND,
  ERR_BOOKING_ALREADY_CANCELLED,
  ERR_BOOKING_NOT_OWNED,
  ERR_CANCELLATION_FAILED,
  ERR_CANCELATION_NOT_ALLOWED,
  ERR_SOMETHING_WENT_WRONG,
  ERR_CANCELLATION_FAILED_WITH_SUCCESS,
} = BookingError;

const { bookingId } = BookingQueryParams;

const cancellationMessages: Record<string, string> = {
  [ERR_BOOKING_NOT_FOUND]: 'The booking cannot be found',
  [ERR_BOOKING_ALREADY_CANCELLED]: 'The booking has been already cancelled',
  [ERR_BOOKING_NOT_OWNED]:
    'Sorry, something went wrong with your booking, please try again later or contact support',
  [ERR_CANCELLATION_FAILED]:
    'Sorry, something went wrong with your booking, please try again later or contact support',
  [ERR_CANCELATION_NOT_ALLOWED]:
    "We're sorry, this booking cannot be cancelled within 48 hours of booking arrival time.",
  [ERR_SOMETHING_WENT_WRONG]:
    'Sorry, something went wrong with your booking, please try again later or contact support',
};

export default function CancelBooking() {
  const router = useRouter();

  const { [bookingId]: emailBookingId } = router.query;

  const [createLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [dateError, setDateError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');

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
    close();
    setErrorMessage('');
    if (
      bookingDetails &&
      cancellationDateValidation(
        new Date(bookingDetails.getBookingByID.bookedFrom)
      ).isValid
    ) {
      mutate({
        variables: { cancelBookingId: emailBookingId },
      }).then((response) => {
        if (response && response.errors) {
          const item = response.errors[0];
          const code = item?.extensions?.code;
          const message = cancellationMessages[code as string];
          if (message) {
            setErrorMessage(message);
          } else if (code === ERR_CANCELLATION_FAILED_WITH_SUCCESS) {
            router.push({
              pathname: '/cancelled-booking-confirmation',
              query: { id: emailBookingId },
            });
          }
        } else {
          router.push({
            pathname: '/cancelled-booking-confirmation',
            query: { bookingId: emailBookingId },
          });
        }
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

          <BookingLightbox
            open={opened}
            ctaForwardCall={handleCancellation}
            ctaForward="CANCEL BOOKING"
            ctaCancel={'CLOSE'}
            onClose={close}
          >
            <Flex
              align="center"
              justify="center"
              wrap="wrap"
              sx={{ padding: '20px 0' }}
            >
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
          </BookingLightbox>

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
                      {errorMessage && (
                        <Notification>{errorMessage}</Notification>
                      )}
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
                            <EditableTitle title="Who's coming?" as="h3">
                              <Flex direction="row" gap={10}>
                                <Flex sx={{ width: '60%' }} gap={10}>
                                  <p style={{ padding: '0', margin: '0' }}>
                                    {' '}
                                    Adults{' '}
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
                              <EditableTitle title="Total price" as="h3">
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

                          <Heading as="h3" margin={0} padding={0}>
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
                        </Stack>
                      )}

                      <Button
                        py={8}
                        handleClick={open}
                        align="center"
                        type="submit"
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

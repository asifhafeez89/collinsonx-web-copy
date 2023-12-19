import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Center, Flex, Stack, Text } from '@collinsonx/design-system/core';
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

import { BookingError } from '../constants';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import { GuestCount } from '@components/guest-count/GuestCount';
import { guestBooking } from 'utils/guestListFormatter';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { arrivalTimeFormatter } from 'utils/ArrivalTimeFormatter';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';

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
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
          setLoading(false);
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
          setLoading(false);
        }
      });
    } else {
      setDateError(true);
      close();
      setLoading(false);
    }
  };

  const arrival = arrivalTimeFormatter(
    bookingDetails?.getBookingByID?.bookedFrom,
    bookingDetails?.getBookingByID.lastArrival
  );

  return (
    <Layout>
      {bookingDetails && !loading ? (
        <Stack spacing={8} sx={{ width: '100%', marginTop: '100px' }}>
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
              sx={{ padding: '10px 0' }}
            >
              <Heading
                as="h2"
                margin={0}
                padding={0}
                style={{ textAlign: 'center' }}
                lineHeight={1.2}
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
              sx={{
                width: '591px',
                paddingTop: '0rem',
                marginTop: '1.2rem',

                '@media (max-width: 768px)': {
                  gap: '0rem',
                  width: '100%',
                  margin: '0',
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
              <LoungeInfo
                hideImageMobile
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
                    <Box
                      sx={{
                        width: '100%',
                      }}
                    >
                      {errorMessage && (
                        <Notification>{errorMessage}</Notification>
                      )}
                      {bookingDetails?.getBookingByID?.experience && (
                        <>
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
                              showBorder={true}
                            >
                              {bookingDetails?.getBookingByID?.reference}
                            </EditableTitle>
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
                              showBorder={false}
                            >
                              {bookingDetails?.getBookingByID?.bookedFrom &&
                                bookingDetails?.getBookingByID?.lastArrival && (
                                  <EstimatedTimeArrival arrival={arrival} />
                                )}
                            </EditableTitle>
                          </Box>
                        </>
                      )}
                      <Center>
                        <Button
                          py={8}
                          handleClick={open}
                          align="center"
                          type="submit"
                          mt={15}
                          data-testid="cancelBooking"
                        >
                          CANCEL BOOKING
                        </Button>
                      </Center>
                    </Box>
                  }
                </Flex>
              )}
            </Stack>
          </Flex>
        </Stack>
      ) : (
        <Flex justify="center" align="center" h="100%" gap={30}>
          <LoaderLifestyleX />
        </Flex>
      )}
    </Layout>
  );
}

CancelBooking.getLayout = (page: JSX.Element) => <>{page}</>;
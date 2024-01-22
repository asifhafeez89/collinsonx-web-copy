import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { Box, Center, Flex, Stack, Text } from '@collinsonx/design-system/core';
import { Booking } from '@collinsonx/utils/generatedTypes/graphql';
import cancellationDateValidation from '@collinsonx/utils/lib/validateDateCancellation';
import { useRouter } from 'next/router';
import { getBookingByID } from '@collinsonx/utils/queries';
import { Button } from '@collinsonx/design-system';
import { cancelBooking } from '@collinsonx/utils/mutations';
import { useState } from 'react';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { useDisclosure } from '@collinsonx/design-system/hooks';
import { BookingQueryParams } from '@collinsonx/constants/enums';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Notification from '@components/Notification';
import { LoungeInfo } from '@components/LoungeInfo';

import { BookingError } from '../constants';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { arrivalTimeFormatter } from 'utils/ArrivalTimeFormatter';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';

import classes from '../styles/CancelBooking.module.css';
import useLocale from 'hooks/useLocale';

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

export default function CancelBooking() {
  const router = useRouter();
  const { [bookingId]: emailBookingId } = router.query;

  const [opened, { open, close }] = useDisclosure(false);
  const [dateError, setDateError] = useState<Boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const translation = useLocale();

  const cancellationMessages: Record<string, string> = {
    [ERR_BOOKING_NOT_FOUND]: translation.booking.cancellation.errors.notFound,
    [ERR_BOOKING_ALREADY_CANCELLED]:
      translation.booking.cancellation.errors.alreadyCancelled,
    [ERR_BOOKING_NOT_OWNED]: translation.booking.cancellation.errors.notOwned,
    [ERR_CANCELLATION_FAILED]: translation.booking.cancellation.errors.failed,
    [ERR_CANCELATION_NOT_ALLOWED]:
      translation.booking.cancellation.errors.notAllowed,
    [ERR_SOMETHING_WENT_WRONG]: translation.booking.cancellation.errors.wrong,
  };

  const { data: bookingDetails } = useQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: { getBookingById: emailBookingId },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {},
  });

  const [cancelBookingMutation] = useMutation(cancelBooking);

  if (!bookingDetails || loading) {
    return (
      <Layout>
        <Flex justify="center" align="center" h="100%" gap={30}>
          <LoaderLifestyleX />
        </Flex>
      </Layout>
    );
  }

  const {
    experience,
    bookedTo,
    bookedFrom,
    reference,
    metadata,
    guestAdultCount,
    guestChildrenCount,
    guestInfantCount,
    lastArrival,
  } = bookingDetails.getBookingByID;

  const handleCancellation = () => {
    setLoading(true);
    close();
    setErrorMessage('');

    if (cancellationDateValidation(new Date(bookedFrom)).isValid) {
      cancelBookingMutation({
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

  const arrival = arrivalTimeFormatter(bookedFrom, lastArrival);

  return (
    <Layout>
      <Stack gap={8} w="100%" mt="100px">
        <BookingLightbox
          open={opened}
          ctaForwardCall={handleCancellation}
          ctaForward={translation.booking.cancellation.btnCancel}
          ctaCancel={translation.booking.cancellation.btnClose}
          onClose={close}
        >
          <Flex align="center" justify="center" wrap="wrap" p="10px 0">
            <Heading
              as="h2"
              margin={0}
              padding={0}
              style={{ textAlign: 'center' }}
              lineHeight={1.2}
            >
              {translation.booking.cancellation.title}
            </Heading>
            <Text size="xl" m="10px 0 10px 0" ta="center">
              {translation.booking.cancellation.description}{' '}
            </Text>
          </Flex>
        </BookingLightbox>

        <Flex
          justify="center"
          align="center"
          direction="column"
          className={classes.containerL1}
        >
          <Stack className={classes.containerL2}>
            <Center className={classes.headingWrapper}>
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                {translation.booking.cancellation.title}
              </Heading>
            </Center>
            <LoungeInfo
              hideImageMobile
              lounge={experience ?? undefined}
              loading={!experience}
            />
            {dateError && bookingDetails && (
              <Notification>
                {cancellationDateValidation(new Date(bookedFrom)).error}
              </Notification>
            )}
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              className={classes.detailsContainer}
            >
              <Box w="100%">
                {errorMessage && <Notification>{errorMessage}</Notification>}
                {experience && (
                  <>
                    <Box className={classes.titleContainer}>
                      <EditableTitle
                        title={translation.booking.cancellation.reference}
                        as="h3"
                        showBorder={true}
                      >
                        {reference}
                      </EditableTitle>
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
                    <Box className={classes.toaContainer}>
                      <EditableTitle
                        title={translation.booking.availableSlots.title}
                        as="h3"
                        showBorder={false}
                      >
                        {bookedFrom && lastArrival && (
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
                    {translation.booking.cancellation.btnCancel}
                  </Button>
                </Center>
              </Box>
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

CancelBooking.getLayout = (page: JSX.Element) => <>{page}</>;

import { useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';

import {
  Anchor,
  Box,
  Center,
  Flex,
  Stack,
  Text,
  Title,
} from '@collinsonx/design-system/core';
import {
  Consumer,
  Booking,
  BookingStatus,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import LoaderLightBox from '@collinsonx/design-system/components/loaderlightbox';
import { getConsumerByID } from '@collinsonx/utils/queries';
import { Details, Button } from '@collinsonx/design-system';

import BookingFormSkeleton from '@components/BookingFormSkeleton';

import { TIME_FORMAT, DATE_REDABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';

import { InfoGroup } from '@collinsonx/design-system/components/details';
import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { BookingContext } from 'context/bookingContext';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

import { useCallback, useContext, useEffect, useRef } from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import BackToLounge from '@components/BackToLounge';
import { MOBILE_ACTION_BACK, POLLING_TIME } from '../constants';
import { sendMobileEvent } from '@lib';
import { InfoPanel } from 'utils/PanelInfo';

export default function ConfirmPayment() {
  const router = useRouter();
  const session: any = useSessionContext();
  const [timer, setTimer] = useState(0);

  let interval = useRef<NodeJS.Timeout>();

  const { lounge, referrerUrl } = usePayload();

  const handleClickBack = useCallback(() => {
    if (window && !referrerUrl) {
      const windowObj: any = window;
      sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
    }
  }, [referrerUrl]);

  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery<{
    getConsumerByID: Consumer;
  }>(getConsumerByID, { variables: { getConsumerById: session.userId } });

  const { getBooking, setBooking } = useContext(BookingContext);

  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if the booking state is incompleted and]

    fetchBookingDetails();
    interval.current = setInterval(() => {
      fetchBookingDetails();
    }, POLLING_TIME);

    return () => clearInterval(interval.current);
  }, []);

  const handleRedoQuery = () => {
    fetchBookingDetails();
  };

  const {
    flightNumber,
    departureDate,
    children,
    bookingId,
    carrierCode,
    adults,
    arrival,
    infants,
  } = getBooking();

  const loungeLocation = useMemo(
    () =>
      lounge && lounge.location
        ? lounge.location.airportName
          ? lounge.location.airportName +
            `${lounge.location.terminal ? ', ' + lounge.location.terminal : ''}`
          : ''
        : '-',
    [lounge]
  );

  const handleSubmit = () => {};

  const [
    fetchBookingDetails,
    { loading: loadingBooking, error: errorBooking, data: dataBooking },
  ] = useLazyQuery<{
    getBookingByID: Booking;
  }>(getBookingByID, {
    variables: {
      getBookingById: bookingId,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setTimer(timer + 1);

      // 30s passed booking is still pending
      if (timer > 10 && data.getBookingByID.status === BookingStatus.Pending) {
        clearInterval(interval.current);
        setOpen(false);
        setAlert(true);
      }
      if (
        data.getBookingByID.status === BookingStatus.Declined ||
        data.getBookingByID.status === BookingStatus.Confirmed
      ) {
        setOpen(false);
        setAlert(false);
        clearInterval(interval.current);

        if (data.getBookingByID.status === BookingStatus.Declined) {
          router.push({
            pathname: '/failure-booking',
          });
        }
      }
    },
  });

  return (
    <Layout>
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <BackToLounge />

        <LoaderLightBox
          open={open}
          title=""
          onHandleClick={handleRedoQuery}
          ctaAction="TRY AGAIN"
          onClose={() => {}}
        >
          <div>
            <h2>Payment is being processed</h2>
            <p>
              Your payment for the{' '}
              <strong>
                {lounge?.loungeName} &nbsp;
                {loungeLocation}
              </strong>{' '}
              is being processed. This might take a few minutes/seconds to
              complete.
              <br />
              <br />
              Please do not leave the screen rather close your browser until the
              action finishes.
            </p>
          </div>
        </LoaderLightBox>

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
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />

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
              {(!lounge || loadingBooking) && <BookingFormSkeleton />}

              {lounge && alert === false && (
                <Box>
                  <Stack>
                    <Box
                      sx={{
                        '@media (max-width: 768px)': {
                          background: colors.white,
                          padding: '20px',
                        },
                      }}
                    >
                      <Title
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: '2.25rem',
                          fontWeight: '700',
                        }}
                      >
                        Your Booking has been confirmed
                      </Title>
                      <Text
                        style={{
                          fontSize: '1.125rem',
                          lineHeight: '1.75rem',
                          fontWeight: '700',
                          marginTop: '0.75rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        Booking reference{' '}
                        {dataBooking?.getBookingByID.reference}
                      </Text>

                      <Text
                        style={{
                          fontSize: '1.125rem',
                          lineHeight: '1.75rem',
                          marginTop: '0.75rem',
                          marginBottom: '0.75rem',
                        }}
                      >
                        A confirmation email has been sent to{' '}
                        <span style={{ fontWeight: 700 }}>
                          {userData?.getConsumerByID?.emailAddress}
                        </span>
                      </Text>
                    </Box>
                  </Stack>

                  {!!lounge && (
                    <Stack
                      sx={{
                        '@media (max-width: 768px)': {
                          marginTop: '10px',
                        },
                      }}
                      spacing={8}
                    >
                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            background: colors.white,
                            padding: '20px',
                          },
                        }}
                      >
                        <Heading as="h2" padding={0} margin={0}>
                          Flight details
                        </Heading>
                        {departureDate && (
                          <Details
                            infos={
                              InfoPanel(
                                departureDate,
                                flightNumber
                              ) as InfoGroup[]
                            }
                            direction="row"
                          />
                        )}
                      </Box>
                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            background: colors.white,
                            padding: '20px',
                          },
                        }}
                      >
                        <Heading as="h2" padding={0} margin={0}>
                          Who's coming
                        </Heading>
                        <Flex direction="row" gap={10}>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            <strong>Adults</strong> {adults}
                          </p>{' '}
                          {Number(children) > 0 ? (
                            <>
                              <p style={{ padding: '0', margin: '0' }}>
                                {' '}
                                <strong>Children</strong> {children}
                              </p>
                            </>
                          ) : null}
                        </Flex>
                      </Box>
                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            background: colors.white,
                            padding: '20px',
                          },
                        }}
                      >
                        <Heading as="h2" padding={0} margin={0}>
                          Estimated time of arrival
                        </Heading>
                        <Flex direction="row" gap={10}>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            {arrival}
                          </p>{' '}
                        </Flex>
                      </Box>
                    </Stack>
                  )}
                  <Center>
                    <Anchor
                      href={referrerUrl ? referrerUrl : '#'}
                      onClick={handleClickBack}
                      style={{
                        textDecoration: 'underline',
                        color: colors.blue,
                        fontSize: '1.125rem',
                        lineHeight: '1.75rem',
                        fontWeight: '600',
                        marginTop: '0.75rem',
                      }}
                    >
                      Return to lounge page
                    </Anchor>
                  </Center>

                  <Button
                    type="submit"
                    data-testid="submit"
                    spacing="1.25rem"
                    align="center"
                    handleClick={handleSubmit}
                  >
                    DOWNLOAD COPY
                  </Button>
                </Box>
              )}

              {!!lounge && alert === true && (
                <Box>
                  <Stack>
                    <Box
                      sx={{
                        '@media (max-width: 768px)': {
                          background: colors.white,
                          padding: '20px',
                        },
                      }}
                    >
                      <Title
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: '2.25rem',
                          fontWeight: '700',
                        }}
                      >
                        <AlertIcon
                          style={{ width: '1.3rem', height: '1.3rem' }}
                        />{' '}
                        Booking Confirmation delay
                      </Title>

                      <Text>
                        We are not able to confirm your booking yet, we will
                        send you an email once your booking is confirmed
                      </Text>

                      <Button
                        type="submit"
                        data-testid="submit"
                        spacing="1.25rem"
                        align="center"
                        handleClick={() => {
                          if (window) {
                            window.location.href = referrerUrl ?? '/';
                          }
                        }}
                      >
                        GO TO LOUNGES
                      </Button>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

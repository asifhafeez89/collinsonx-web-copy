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
import { Details } from '@collinsonx/design-system';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { BookingContext } from 'context/bookingContext';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { useState } from 'react';
import { useMemo } from 'react';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import BackToLounge from '@components/BackToLounge';
import { MOBILE_ACTION_BACK, POLLING_TIME } from '../constants';
import { sendMobileEvent } from '@lib';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import Price from '@components/Price';
import { InfoPanel } from 'utils/PanelInfo';
import { GenerateBookingConfirmedPdf } from '@components/booking/GenerateBookingConfirmedPdf';
import { GuestCount } from '@components/guests/GuestCount';
import BackButton from '@components/BackButton';
import { FlightContext } from 'context/flightContext';

export default function ConfirmPayment() {
  const router = useRouter();
  const session: any = useSessionContext();
  const [timer, setTimer] = useState(0);

  let interval = useRef<NodeJS.Timeout>();

  const { lounge, referrerUrl } = usePayload();

  const handleClickBack: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (window && !referrerUrl) {
        e.preventDefault();
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    },
    [referrerUrl]
  );

  const [userData, setUserData] = useState<Consumer | null>(null);

  const { loading: userLoading, error: userError } = useQuery<{
    getConsumerByID: Consumer;
  }>(getConsumerByID, {
    variables: { getConsumerById: session.userId },
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      setUserData(data?.getConsumerByID || null);
    },
  });

  const { getBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);

  const [open, setOpen] = useState(true);
  const [alert, setAlert] = useState<boolean | null>(null);

  useEffect(() => {
    if (session.userId) {
      userLoading && console.log('Fetching user data...');

      if (userError) {
        console.error('Error fetching user data:', userError);
      }
    }
  }, [session.userId, userLoading, userError]);

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

  const { flightNumber, children, bookingId, adults, arrival, infants } =
    getBooking();

  const flightData = getFlight();

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

  const departureTime = flightData?.departure?.dateTime?.local;

  const [fetchBookingDetails, { loading: loadingBooking, data: dataBooking }] =
    useLazyQuery<{
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
        if (
          timer > 10 &&
          data.getBookingByID.status === BookingStatus.Pending
        ) {
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
              Your payment for{' '}
              <strong>
                {lounge?.loungeName} &nbsp;
                {loungeLocation}
              </strong>{' '}
              is being processed.
              <br />
              <br />
              Please don't refresh the page, it may take a few minutes to
              complete.
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
                        Good news! Your booking has been confirmed
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
                          {userData?.emailAddress}
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
                        {departureTime && (
                          <Details
                            infos={
                              InfoPanel(
                                departureTime,
                                flightNumber
                              ) as InfoGroup[]
                            }
                            direction="row"
                          />
                        )}
                      </Box>

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
                        <EditableTitle title="Who's coming?" as="h2">
                          <GuestCount
                            adults={adults}
                            children={children}
                            infants={infants}
                          />
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
                              lounge={lounge}
                              guests={{ adults, infants, children }}
                            ></Price>
                          </EditableTitle>
                        </Box>
                      </Flex>

                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            background: colors.white,
                            padding: '20px',
                          },
                        }}
                      >
                        <Heading as="h2" padding={0} margin={0}>
                          Estimated lounge arrival time
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
                    <GenerateBookingConfirmedPdf
                      adults={adults}
                      arrival={arrival}
                      children={children}
                      departureTime={departureTime}
                      emailAddress={userData?.emailAddress}
                      flightNumber={flightNumber}
                      infants={infants}
                      lounge={lounge}
                      reference={dataBooking?.getBookingByID.reference}
                    />
                  </Center>
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
                        We're sorry we're not able to confirm your booking right
                        now. We will send an email as soon as your booking is
                        confirmed.
                      </Text>
                      <Box sx={{ padding: '1.25rem', textAlign: 'center' }}>
                        <BackButton>GO TO LOUNGES</BackButton>
                      </Box>
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

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
  Booking,
  BookingStatus,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import LoaderLightBox from '@collinsonx/design-system/components/loaderlightbox';
import { Details } from '@collinsonx/design-system';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { BookingContext } from 'context/bookingContext';
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
import TopBarLinks from '@components/TopBarLinks';
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
  const [timer, setTimer] = useState(0);

  let interval = useRef<NodeJS.Timeout>();

  const {
    lounge,
    loungeCode,
    referrerUrl,
    consumerData,
    platform,
    jwt,
    payload,
  } = usePayload();

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

  const { getBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);

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
        <TopBarLinks />

        <LoaderLightBox open={open} title="" ctaAction="" onClose={() => {}}>
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
            sx={{
              width: '591px',
              gap: '0.5rem',
              '@media (max-width: 768px)': {
                width: '100%',
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
                Booking confirmation
              </Heading>
            </Center>
            <Box
              sx={{
                '@media (max-width: 480px)': {
                  display: 'none',
                },
              }}
            >
              <LoungeInfo lounge={lounge} loading={!lounge} hideImageMobile />
            </Box>

            <Flex
              gap={0}
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
                <Box p={0}>
                  <Box
                    sx={{
                      '@media (max-width: 768px)': {
                        background: colors.white,
                      },
                    }}
                  >
                    <Heading
                      style={{
                        fontSize: '1.5rem',
                        lineHeight: '2.25rem',
                        fontWeight: '700',
                      }}
                      as="h2"
                      padding={0}
                      margin={0}
                      lineHeight={1.3}
                    >
                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            padding: '20px',
                          },
                        }}
                      >
                        Good news! Your booking has been confirmed
                      </Box>
                    </Heading>
                    <EditableTitle
                      title=" Booking reference"
                      as="h3"
                      showBorder={true}
                    >
                      Booking reference {''}{' '}
                      {dataBooking?.getBookingByID.reference}
                      <p>
                        A confirmation email has been sent to{' '}
                        <span style={{ fontWeight: 700 }}>
                          {consumerData?.getConsumerByID.emailAddress}
                        </span>
                      </p>
                    </EditableTitle>
                  </Box>

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
                          },
                        }}
                      >
                        <EditableTitle
                          as="h2"
                          title="Flight details"
                          showBorder={true}
                        >
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
                        </EditableTitle>
                      </Box>
                      <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        justify={'space-between'}
                        sx={{
                          width: '100%',
                          borderBottom: `1px solid ${colors.borderSection}`,

                          '@media (max-width: 768px)': {
                            width: '100%',
                            border: 'none',
                          },
                        }}
                      >
                        <EditableTitle
                          title="Who's coming?"
                          as="h2"
                          showBorder={false}
                        >
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
                          <EditableTitle
                            title="Total price"
                            as="h2"
                            showBorder={false}
                          >
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
                          },
                        }}
                      >
                        <EditableTitle
                          title="Estimated time of arrival"
                          as="h2"
                          showBorder={true}
                        >
                          <p style={{ padding: '0', margin: '0' }}>
                            Timeslots are shown in the time zone of the lounge
                            location
                          </p>
                          <Flex direction="row" gap={5}>
                            <p style={{ padding: '0', margin: '0' }}>
                              {' '}
                              {arrival}
                            </p>{' '}
                          </Flex>
                        </EditableTitle>
                      </Box>

                      <EditableTitle
                        title="Important Notes"
                        as="h2"
                        showBorder={false}
                      >
                        <ul style={{ paddingLeft: '1em' }}>
                          <li>
                            {' '}
                            Please remember to bring your booking reference
                            number, boarding pass and photo ID along with your
                            Priority Pass membership card or eligible access
                            method for check in at the lounge.{' '}
                          </li>
                          <li>
                            Maximum stay is 3 hours prior to your flight time.
                          </li>
                          <li>
                            Cancellation must be made at least 48 hours in
                            advance of your visit date & time to receive a
                            refund. No refund will be issued after this time.
                          </li>
                        </ul>
                      </EditableTitle>
                    </Stack>
                  )}
                  <Flex
                    justify={'center'}
                    direction={'column'}
                    align={'center'}
                  >
                    <GenerateBookingConfirmedPdf
                      adults={adults}
                      arrival={arrival}
                      children={children}
                      departureTime={departureTime}
                      emailAddress={consumerData?.getConsumerByID.emailAddress}
                      flightNumber={flightNumber}
                      infants={infants}
                      lounge={lounge}
                      reference={dataBooking?.getBookingByID.reference}
                      bookingId={dataBooking?.getBookingByID.id}
                      loungeCode={loungeCode}
                      linkAccountToken={jwt}
                      accountProvider={payload?.accountProvider}
                      membershipType={payload?.membershipType}
                      platform={platform}
                    />
                    <Anchor
                      target="_top"
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
                  </Flex>
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

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
import {
  ANALYTICS_TAGS,
  MOBILE_ACTION_BACK,
  PDF_VERSION_ACCEPTED,
  POLLING_TIME,
  VERSION,
} from '../constants';
import { getItem, logAction, sendMobileEvent } from '@lib';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { GenerateBookingConfirmedPdf } from '@components/booking/GenerateBookingConfirmedPdf';
import BackButton from '@components/BackButton';
import { FlightContext } from 'context/flightContext';
import EstimatedTimeArrival from '@components/EstimatedTimeArrival';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import ShowButtonByVersion from '@components/ShowDownloadButton';
import useLocale from 'hooks/useLocale';


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

  const pageName = 'BookingConfirmed';

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_PAGE_ENTER_CONFIRMED);
  }, []);

  const handleClickBack: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (window && !referrerUrl) {
        e.preventDefault();
        logAction(pageName, ANALYTICS_TAGS.ON_PAGE_CONFIRMED_BACK_BTN);
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

  const translations = useLocale();

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

  const version = getItem(VERSION);

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

        <LoaderLightBox
          open={open}
          title=""
          ctaAction=""
          onClose={() => {}}
          logAction={() =>
            logAction(pageName, ANALYTICS_TAGS.ON_PAYMENT_PROCESSED)
          }
        >
          <div>
            <h2>
              {
                translations.booking.confirmationPayment.processing
                  .beingProcessed.title
              }
            </h2>
            <p>
              {
                translations.booking.confirmationPayment.processing
                  .beingProcessed.description.line1
              }
              <strong>
                {lounge?.loungeName} &nbsp;
                {loungeLocation}
              </strong>{' '}
              {
                translations.booking.confirmationPayment.processing
                  .beingProcessed.description.line2
              }
              <br />
              <br />
              {
                translations.booking.confirmationPayment.processing
                  .beingProcessed.description.line3
              }
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
                {translations.booking.confirmationPayment.title}
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
                        {
                          translations.booking.confirmationPayment.outcome
                            .succesful.title
                        }
                      </Box>
                    </Heading>
                    <EditableTitle
                      title={
                        translations.booking.confirmationPayment.outcome
                          .succesful.reference.label
                      }
                      as="h3"
                      showBorder={true}
                    >
                      {
                        translations.booking.confirmationPayment.outcome
                          .succesful.reference.label
                      }{' '}
                      {''} {dataBooking?.getBookingByID.reference}
                      <p>
                        {
                          translations.booking.confirmationPayment.outcome
                            .succesful.emailConfirmationLabel
                        }{' '}
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
                      <FlightDetailsAndGuests
                        departureTime={departureTime ? departureTime : ''}
                        flightNumber={flightNumber}
                        guestList={{ adults, infants, children }}
                        lounge={lounge}
                        noEdit={true}
                      />

                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            background: colors.white,
                          },
                        }}
                      >
                        <EditableTitle
                          title={translations.booking.availableSlots.title}
                          as="h2"
                          showBorder={true}
                        >
                          {arrival && (
                            <EstimatedTimeArrival arrival={arrival} />
                          )}
                        </EditableTitle>
                      </Box>

                      <EditableTitle
                        title={
                          translations.booking.confirmationPayment.outcome
                            .succesful.importantNotes.title
                        }
                        as="h2"
                        showBorder={false}
                      >
                        <ul style={{ paddingLeft: '1em' }}>
                          {translations.booking.confirmationPayment.outcome.succesful.importantNotes.notes.map(
                            (note) => (
                              <li>{note}</li>
                            )
                          )}
                        </ul>
                      </EditableTitle>
                    </Stack>
                  )}
                  <Flex
                    justify={'center'}
                    direction={'column'}
                    align={'center'}
                  >
                    {platform === 'web' && (
                      <ShowButtonByVersion
                        currentVersion={version ?? ''}
                        minVersion={PDF_VERSION_ACCEPTED}
                      >
                        <GenerateBookingConfirmedPdf
                          adults={adults}
                          arrival={arrival}
                          children={children}
                          departureTime={departureTime}
                          emailAddress={
                            consumerData?.getConsumerByID.emailAddress
                          }
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
                          analyticsTag={
                            ANALYTICS_TAGS.ON_PAGE_CONFIRMED_BTN_DOWNLOAD
                          }
                        />
                      </ShowButtonByVersion>
                    )}
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
                      {
                        translations.booking.confirmationPayment.outcome
                          .succesful.btn.return
                      }
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
                        {
                          translations.booking.confirmationPayment.outcome.delay
                            .title
                        }
                      </Title>
                      <Text>
                        {
                          translations.booking.confirmationPayment.outcome.delay
                            .description
                        }
                      </Text>
                      <Box sx={{ padding: '1.25rem', textAlign: 'center' }}>
                        <BackButton
                          analyticsTag={
                            ANALYTICS_TAGS.ON_PAGE_CONFIRMED_BACK_BTN
                          }
                        >
                          {
                            translations.booking.confirmationPayment.outcome
                              .delay.btn
                          }
                        </BackButton>
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

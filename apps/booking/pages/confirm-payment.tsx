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
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { BookingContext } from 'context/bookingContext';
import {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { getBookingByID } from '@collinsonx/utils/queries';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import TopBarLinks from '@components/TopBarLinks';
import {
  ANALYTICS_TAGS,
  BOKING_MODE_STATE,
  BOOKING_MODE,
  MOBILE_ACTION_BACK,
  PAGENAMES,
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

import classes from '../styles/ConfirmPayment.module.css';

export default function ConfirmPayment() {
  const router = useRouter();
  const [timer, setTimer] = useState(0);

  let interval = useRef<NodeJS.Timeout>();

  const {
    locale,
    lounge,
    loungeCode,
    referrerUrl,
    consumerData,
    platform,
    jwt,
    payload,
  } = usePayload();

  const pageName = PAGENAMES.BOOKING_CONFIRMED;

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
  const Mode = getItem(BOKING_MODE_STATE);
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

  const {
    flightNumber,
    children,
    bookingId,
    adults,
    arrival,
    infants,
    currentPrice,
  } = getBooking();

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

        if (data.getBookingByID === null && timer > 30) {
          router.push({
            pathname: '/failure-booking',
          });
        } else if (data.getBookingByID.status === BookingStatus.Declined) {
          router.push({
            pathname: '/failure-booking',
          });
        } else if (data.getBookingByID.status === BookingStatus.Pending) {
          if (timer > 10) {
            clearInterval(interval.current);
            setOpen(false);
            setAlert(true);
          }

          if (timer > 30) {
            router.push({
              pathname: '/failure-booking',
            });
          }
        } else if (data.getBookingByID.status === BookingStatus.Confirmed) {
          setOpen(false);
          setAlert(false);
          clearInterval(interval.current);
        }
      },
    });

  return (
    <Layout>
      <Stack gap={8} className={classes.container}>
        <TopBarLinks page={pageName} />
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
            <h3>
              {
                translations.booking.confirmationPayment.processing
                  .beingProcessed.title
              }
            </h3>
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
          className={classes.containerOuter}
        >
          <Stack className={classes.containerInner}>
            <Center className={classes.titleContainer}>
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                {Mode === BOOKING_MODE.EDIT
                  ? translations.booking.confirmationPayment.amendTitle
                  : translations.booking.confirmationPayment.title}
              </Heading>
            </Center>
            <Box className={classes.loungeInfo}>
              <LoungeInfo lounge={lounge} loading={!lounge} hideImageMobile />
            </Box>

            <Flex gap={0} className={classes.flexContainer}>
              {(!lounge || loadingBooking) && <BookingFormSkeleton />}

              {lounge && alert === false && (
                <Box p={0}>
                  <Box className={classes.headingContainer}>
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
                      <Box className={classes.successfulTitle}>
                        {Mode === BOOKING_MODE.EDIT
                          ? translations.booking.confirmationPayment.outcome
                              .succesful.titleAmend
                          : translations.booking.confirmationPayment.outcome
                              .succesful.title}
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
                    <Stack className={classes.details} gap={8}>
                      <FlightDetailsAndGuests
                        departureTime={departureTime ? departureTime : ''}
                        flightNumber={flightNumber}
                        guestList={{ adults, infants, children }}
                        lounge={lounge}
                        noEdit={true}
                        mode={Mode as BOOKING_MODE}
                        currentPrice={currentPrice}
                      />

                      <Box className={classes.slotsTitle}>
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
                            (note, i) => (
                              <li key="li">{note}</li>
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
                    <ShowButtonByVersion
                      currentVersion={version ?? ''}
                      minVersion={process.env.NEXT_PUBLIC_VERSION ?? ''}
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
                        locale={locale}
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
                        currentPrice={currentPrice}
                        mode={Mode as BOOKING_MODE}
                      />
                    </ShowButtonByVersion>
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
                    <Box className={classes.confirmation}>
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
                      <Box p="1.25rem" ta="center">
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

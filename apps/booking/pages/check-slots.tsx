import { useLazyQuery, useMutation } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import {
  Box,
  Flex,
  Stack,
  Button,
  Center,
} from '@collinsonx/design-system/core';
import {
  AmendmentStatus,
  BookingType,
  PaymentOption,
  ProductType,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import amendBooking from '@collinsonx/utils/mutations/amendBooking';
import { useState, useContext, useEffect, useCallback, FC } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import {
  AvailableSlots,
  AvailableSlotsErrorHandling,
  availableSlotsPopUpIsVisible,
} from '@components/flightInfo/availability';

import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { Slots } from '@collinsonx/utils';
import { TIME_FORMAT, TRAVEL_TYPE } from '../config/Constants';
import { formatDate, formatTimezone } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';
import { BookingContext } from 'context/bookingContext';
import dayjs from 'dayjs';
import {
  ANALYTICS_TAGS,
  BookingError,
  MOBILE_ACTION_BACK,
  BOOKING_MODE,
  BOKING_MODE_STATE,
  constants,
  PAGENAMES,
} from '../constants';
import TopBarLinks from '@components/TopBarLinks';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';
import Notification from '@components/Notification';
import { getItem, log, logAction, sendMobileEvent } from '../lib/index';
import { FlightContext } from 'context/flightContext';
import getError from 'utils/getError';
import { Clock, Warning } from '@collinsonx/design-system/assets/icons';
import Heading from '@collinsonx/design-system/components/heading/Heading';
import { FlightDetailsAndGuests } from '@components/FlightDetailsAndGuests';
import useLocale from 'hooks/useLocale';

import classes from '../styles/CheckAvailability.module.css';
import LoaderLightBox from '@collinsonx/design-system/components/loaderlightbox';

const { BAD_USER_INPUT } = BookingError;

const availabilityMessagess: Record<string, string> = {
  [BAD_USER_INPUT]: 'Please select your estimated arrival time',
};

export default function CheckAvailability() {
  const router = useRouter();

  const { getBooking, setBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);
  const booking = getBooking();
  const flightData = getFlight();
  const Booking_Mode = getItem(BOKING_MODE_STATE);
  const existingSlotStart =
    Booking_Mode === BOOKING_MODE.EDIT
      ? booking.existing_booking_slot.split(' ')[1].substring(0, 5)
      : '';

  const existingSlotEnd =
    Booking_Mode === BOOKING_MODE.EDIT
      ? `${
          Number.parseInt(
            booking.existing_booking_slot
              .split(' ')[1]
              .substring(0, 5)
              .split(':')[1]
          ) === 45
            ? Number.parseInt(
                booking.existing_booking_slot
                  .split(' ')[1]
                  .substring(0, 5)
                  .split(':')[0]
              ) + 1
            : booking.existing_booking_slot
                .split(' ')[1]
                .substring(0, 5)
                .split(':')[0]
        }:${(Number.parseInt(
          booking.existing_booking_slot
            .split(' ')[1]
            .substring(0, 5)
            .split(':')[1]
        ) === 45
          ? '00'
          : Number.parseInt(
              booking.existing_booking_slot
                .split(' ')[1]
                .substring(0, 5)
                .split(':')[1]
            ) + 15
        ).toString()}`
      : '';

  const [selectedslot, setSelectedslot] = useState<string>(
    Booking_Mode === BOOKING_MODE.EDIT
      ? `${existingSlotStart}-${existingSlotEnd}`
      : ''
  );

  const { referrerUrl, lounge, linkedAccountId } = usePayload();
  const [airportMismatch, setAirportMismatch] = useState(false);
  const [terminalMismatch, setTerminalMismath] = useState(false);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const pageName =
    Booking_Mode === BOOKING_MODE.EDIT
      ? PAGENAMES.SLOTAMEND
      : PAGENAMES.PICK_SLOT;

  const { flightNumber, children, adults, infants } = booking;

  setBooking(booking);

  const [mutate, { loading: cbLoading }] = useMutation(
    Booking_Mode === BOOKING_MODE.CREATE ? createBooking : amendBooking
  );

  const translations = useLocale();

  useEffect(() => {
    logAction(
      pageName,
      Booking_Mode === BOOKING_MODE.EDIT
        ? ANALYTICS_TAGS.ON_SLOT_AMEND_ENTER
        : ANALYTICS_TAGS.ON_SLOT_PG_ENTER
    );
  }, []);

  const findSelectedSlot = (slots: Slots[] | undefined, value: string) => {
    const slot = slots?.find((slot) => {
      const startDate = formatDate(slot.startDate, TIME_FORMAT);
      const endDate = formatDate(slot.endDate, TIME_FORMAT);
      const slotLabel = `${startDate}-${endDate}`;
      return slotLabel === value;
    });
    return slot;
  };

  const handleSubmit = () => {
    setMessage('');

    logAction(
      pageName,
      Booking_Mode == BOOKING_MODE.EDIT
        ? ANALYTICS_TAGS.ON_SLOT_AMEND_CONFIRMED
        : ANALYTICS_TAGS.ON_SLOT_CONTINUE
    );

    const availableSlots = slotsData?.getAvailableSlots.slots;
    const slot = findSelectedSlot(availableSlots, selectedslot);

    const departureTime = flightData?.departure?.dateTime?.local as string;
    const flightTimezone = lounge?.location?.timezone as string;
    const departureTimeWithTimezone = formatTimezone(
      departureTime,
      flightTimezone
    );

    if (!slot) {
      return setMessage(availabilityMessagess[BAD_USER_INPUT]);
    }

    const startDateWithTimezone = formatTimezone(
      slot.startDate,
      flightTimezone
    );
    const endDateWithTimezone = formatTimezone(slot.endDate, flightTimezone);

    if (!linkedAccountId) {
      log(`[createBooking error] linkedAccountId == ${linkedAccountId}`);
    }

    const bookingInput = {
      ...(linkedAccountId && { actingAccount: linkedAccountId }),
      experience: { id: lounge?.id },
      bookedFrom: startDateWithTimezone,
      lastArrival: endDateWithTimezone,
      bookedTo: departureTimeWithTimezone,
      type: BookingType.ReservationFeeOnly,
      guestAdultCount: adults,
      guestChildrenCount: children,
      guestInfantCount: infants,
      metadata: {
        flightNumber,
        flightTime,
      },
    };

    const amendmentInput = {
      ...(linkedAccountId && { actingAccount: linkedAccountId }),
      bookingID: booking.bookingId,
      bookedFrom: startDateWithTimezone,
      bookedTo: departureTimeWithTimezone,
      lastArrival: endDateWithTimezone,
      guestAdultCount: adults,
      guestChildrenCount: children,
      guestInfantCount: infants,
    };

    log('[createBooking] linkedAccountId: ', linkedAccountId);
    log('[createBooking] bookingInput: ', JSON.stringify(bookingInput));
    log(
      '[createBooking] bookingInput.actingAccount: ',
      bookingInput.actingAccount
    );

    if (Booking_Mode === BOOKING_MODE.CREATE) {
      mutate({
        variables: { bookingInput },
      }).then((response: any) => {
        log(
          '[createBooking] createBooking response: ',
          JSON.stringify(response || null)
        );
        const badUserInputError = getError(response, BAD_USER_INPUT);
        if (badUserInputError) {
          return setMessage(availabilityMessagess[BAD_USER_INPUT]);
        } else if (response.data?.createBooking) {
          booking.bookingId = response.data.createBooking.id;

          booking.arrival = selectedslot;

          setBooking(booking);
          setOpen(false);
          router.push({
            pathname: '/confirm-booking',
          });
        }
      });
    } else {
      mutate({ variables: { amendmentInput } }).then((response: any) => {
        const { data } = response;

        // Todo - Add a check if the booking is less than 48hrs

        if (
          data.confirmAmendment.paymentOption ===
          PaymentOption.NoPaymentRequired
        ) {
          router.push({
            pathname: '/confirm-amendment',
          });
        } else if (
          data.confirmAmendment.paymentOption === PaymentOption.Refund
        ) {
          router.push({
            pathname: '/confirm-refund-amendment',
          });
        } else {
          router.push({
            pathname: '/confirm-booking',
          });
          booking.amendmentID = response.id;
        }
      });
    }
  };

  const [
    fetchSlots,
    { loading: slotsLoading, error: slotsError, data: slotsData },
  ] = useLazyQuery<{
    getAvailableSlots: Availability;
  }>(getAvailableSlots);

  useEffect(() => {
    if (!flightData || !lounge) return;

    const airport = flightData.departure?.airport;
    const airportCode = lounge.location?.airportCode;

    const sameAirport =
      airportCode?.toLocaleLowerCase() === airport?.toLocaleLowerCase();

    if (!sameAirport) {
      setAirportMismatch(true);
    }

    const partnerKey = process.env.NEXT_PUBLIC_SNAPLOGIC_PARTNER_KEY
      ? process.env.NEXT_PUBLIC_SNAPLOGIC_PARTNER_KEY
      : 'partnerIdProd';
    const productID =
      partnerKey === 'partnerIdTest'
        ? lounge.partnerIdTest
        : lounge.partnerIdProd;

    log('NEXT_PUBLIC_SNAPLOGIC_PARTNER_KEY', partnerKey, productID);

    fetchSlots({
      variables: {
        data: {
          flightInformation: {
            type: TRAVEL_TYPE,
            dateTime: flightData.departure?.dateTime?.local,
            airport: flightData.departure?.airport,
            terminal: '-1',
          },
          guests: {
            adultCount: adults,
            childrenCount: children,
            infantCount: infants,
          },
          product: {
            productType: ProductType.Lounge,
            productID: productID,
            supplierCode: lounge.partnerIntegrationId,
          },
        },
      },
    });
  }, []);

  const departureTime = flightData?.departure?.dateTime?.local;

  const dayjsDepartureTime = dayjs(departureTime, {
    format: 'dd-MM-YYYY HH:mm',
  });
  const flightTime = dayjsDepartureTime.format(constants.TIME_FORMAT);
  const flightTimeToDisplay = dayjsDepartureTime.format(
    constants.TIME_FORMAT_DISPLAY
  );

  const handleSelectSlot = async (value: string | null) => {
    await logAction(
      pageName,
      Booking_Mode == BOOKING_MODE.EDIT
        ? ANALYTICS_TAGS.ON_SLOT_CHANGED_AMEND
        : ANALYTICS_TAGS.ON_SLOT_CHANGE
    );
    setSelectedslot(value ?? '');
  };

  const showAlert = airportMismatch || terminalMismatch;

  const handleClickBack = useCallback(() => {
    if (top) {
      if (referrerUrl) {
        top.location.href = referrerUrl;
      } else {
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    }
  }, [referrerUrl]);

  return (
    <Layout>
      {showAlert && (
        <BookingLightbox
          open={true}
          ctaCancel="RETURN TO LOUNGE"
          ctaForward="CONTINUE BOOKING"
          ctaForwardCall={() => {
            setAirportMismatch(false);
            setTerminalMismath(false);
          }}
          onClose={handleClickBack}
        >
          <div>
            {airportMismatch && (
              <h1>
                {
                  translations.booking.availableSlots.errors.airportMismatch
                    .title
                }
              </h1>
            )}
            {terminalMismatch && (
              <h1>
                {
                  translations.booking.availableSlots.errors.terminalMismatch
                    .title
                }
              </h1>
            )}
            <div>
              {airportMismatch && (
                <p>
                  {
                    translations.booking.availableSlots.errors.airportMismatch
                      .description
                  }
                </p>
              )}
              {terminalMismatch && (
                <p>
                  {
                    translations.booking.availableSlots.errors.terminalMismatch
                      .description
                  }{' '}
                </p>
              )}
              <p>{translations.booking.availableSlots.errors.confirmation}</p>
            </div>
          </div>
        </BookingLightbox>
      )}
      <LoaderLightBox open={open} title="" ctaAction="" onClose={() => {}}>
        <div>
          <h2>{translations.booking.checkAvailability.confirmModal.title}</h2>
          <p>
            {translations.booking.checkAvailability.confirmModal.description}
          </p>
        </div>
      </LoaderLightBox>
      <Stack gap={8} className={classes.container}>
        <Stack w="100%">
          <TopBarLinks page={pageName} />
        </Stack>
        <Flex direction="column" w="100%">
          <Stack gap={10} className={classes.outerContainer}>
            <Center className={classes.titleWrapper}>
              <Heading as="h3" padding={0} margin={0} lineHeight={1}>
                {Booking_Mode === BOOKING_MODE.EDIT
                  ? translations.booking.checkAvailability.amendTitle
                  : translations.booking.checkAvailability.arrivalTitle}
              </Heading>
            </Center>
            <LoungeInfo lounge={lounge} loading={!lounge} />
            {!linkedAccountId && (
              <Notification>
                {translations.booking.checkAvailability.notFoundError}
              </Notification>
            )}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              className={classes.bookingFormContainer}
            >
              {!lounge && <BookingFormSkeleton />}

              {lounge && (
                <Box className={classes.fullWidthMobile}>
                  {lounge && (
                    <Stack gap={8}>
                      <FlightDetailsAndGuests
                        departureTime={departureTime ? departureTime : ''}
                        flightNumber={flightNumber}
                        guestList={{ adults, infants, children }}
                        lounge={lounge}
                      />
                      <EditableTitle
                        title={translations.booking.availableSlots.title}
                        as="h2"
                        showBorder={true}
                      >
                        <Flex
                          align={'center'}
                          gap={'xs'}
                          className={classes.flexMobile}
                        >
                          <Warning style={{ width: '20px', height: '20px' }} />
                          <p
                            style={{
                              padding: '0',
                              margin: '0',
                              paddingLeft: '10',
                            }}
                          >
                            {translations.booking.availableSlots.description}
                          </p>
                        </Flex>

                        {slotsData ? (
                          <AvailableSlots
                            onSelectSlot={handleSelectSlot}
                            availableSlots={slotsData?.getAvailableSlots}
                            error={message}
                            selectedSlot={selectedslot}
                          />
                        ) : null}

                        <AvailableSlotsErrorHandling
                          error={slotsError}
                          airportMismatch={airportMismatch}
                        ></AvailableSlotsErrorHandling>
                        <div>
                          {
                            translations.booking.availableSlots
                              .arrivalDescription
                          }
                        </div>
                        <Flex
                          align={'center'}
                          gap={'xs'}
                          className={classes.flexMobile}
                        >
                          <Clock style={{ width: '20px', height: '20px' }} />
                          <p
                            style={{
                              padding: '0',
                              margin: '0',
                              paddingLeft: '10',
                            }}
                          >
                            {translations.booking.availableSlots.stayTime.line1}{' '}
                            <strong>{flightTimeToDisplay}</strong>
                            {
                              translations.booking.availableSlots.stayTime.line2
                            }{' '}
                            <strong>
                              {
                                translations.booking.availableSlots.stayTime
                                  .line3
                              }
                            </strong>
                            .
                          </p>
                        </Flex>
                      </EditableTitle>
                      <EditableTitle
                        title={
                          translations.booking.availableSlots.cancellationPolicy
                            .title
                        }
                        as="h2"
                        showBorder={false}
                      >
                        <p style={{ padding: '0', margin: '0' }}>
                          {
                            translations.booking.availableSlots
                              .cancellationPolicy.descriptionLine1
                          }{' '}
                        </p>
                        <div>
                          <p style={{ padding: '0', margin: '0' }}>
                            {
                              translations.booking.availableSlots
                                .cancellationPolicy.descriptionLine2
                            }
                          </p>
                        </div>
                      </EditableTitle>
                    </Stack>
                  )}
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
        <Center>
          <Button
            disabled={
              slotsLoading ||
              cbLoading ||
              availableSlotsPopUpIsVisible({
                error: slotsError,
                airportMismatch: airportMismatch,
              })
            }
            type="submit"
            data-testid="submit"
            onClick={handleSubmit}
            className={classes.availableSlotsButton}
          >
            {translations.booking.availableSlots.btn}
          </Button>
        </Center>
      </Stack>
    </Layout>
  );
}

CheckAvailability.getLayout = (page: JSX.Element) => <>{page}</>;

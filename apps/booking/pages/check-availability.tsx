import {
  ApolloError,
  useLazyQuery,
  useMutation,
} from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import {
  Box,
  Flex,
  Stack,
  Button,
  Center,
  ActionIcon,
} from '@collinsonx/design-system/core';
import {
  BookingType,
  ProductType,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import { Details } from '@collinsonx/design-system';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import { useState, useContext, useEffect, useCallback, FC } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import {
  AvailableSlots,
  hasLoungeCapacity,
  hasLoungeCapacityDefaultError,
  availableSlotsNotEnoughCapacityParser,
  loadDefaultError,
} from '@components/flightInfo/availability';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { Slots } from '@collinsonx/utils';
import {
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  TRAVEL_TYPE,
} from '../config/Constants';
import { formatDate, formatDateUTC } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import dayjs from 'dayjs';
import { BookingError, MOBILE_ACTION_BACK, constants } from '../constants';
import colors from 'ui/colour-constants';
import TopBarLinks from '@components/TopBarLinks';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';
import Price from '@components/Price';
import Notification from '@components/Notification';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '@components/guests/GuestCount';
import { log, sendMobileEvent } from '../lib/index';
import { FlightContext } from 'context/flightContext';
import getError from 'utils/getError';
import { Clock, Warning } from '@collinsonx/design-system/assets/icons';
import Heading from '@collinsonx/design-system/components/heading/Heading';

const { BAD_USER_INPUT } = BookingError;

const availabilityMessagess: Record<string, string> = {
  [BAD_USER_INPUT]: 'Please select your estimated arrival time',
};

interface AvailableSlotsErrorHandlingProps {
  error: ApolloError | unknown;
  airportMismatch: boolean;
}

const AvailableSlotsErrorHandling: FC<AvailableSlotsErrorHandlingProps> = ({
  error,
  airportMismatch,
}) => {
  if (airportMismatch) return null;

  const ENOUGH_CAPACITY_ERROR_IS_VALID = hasLoungeCapacity(error);

  if (ENOUGH_CAPACITY_ERROR_IS_VALID) {
    return availableSlotsNotEnoughCapacityParser(error);
  }

  const DEFAULT_ERROR = hasLoungeCapacityDefaultError(error);

  if (DEFAULT_ERROR) {
    return loadDefaultError();
  }

  return null;
};

export default function CheckAvailability() {
  const router = useRouter();

  const { getBooking, setBooking } = useContext(BookingContext);
  const { getFlight } = useContext(FlightContext);

  const [selectedslot, setSelectedslot] = useState<string>('');
  const { referrerUrl, lounge, linkedAccountId } = usePayload();
  const [airportMismatch, setAirportMismatch] = useState(false);
  const [terminalMismatch, setTerminalMismath] = useState(false);
  const [message, setMessage] = useState('');

  const booking = getBooking();
  const flightData = getFlight();

  const { flightNumber, children, adults, infants } = booking;

  booking.arrival = selectedslot;
  setBooking(booking);

  const [mutate, { loading: cbLoading }] = useMutation(createBooking);

  const findSelectedSlot = (slots: Slots[] | undefined, value: string) => {
    const slot = slots?.find((slot) => {
      const startDate = formatDate(slot.startDate, TIME_FORMAT);
      const endDate = formatDate(slot.endDate, TIME_FORMAT);
      const slotLabel = ` ${startDate}-${endDate}`;
      return slotLabel === value;
    });
    return slot;
  };

  const handleSubmit = () => {
    setMessage('');

    const availableSlots = slotsData?.getAvailableSlots.slots;
    const slot = findSelectedSlot(availableSlots, selectedslot);

    const departureTime = flightData?.departure?.dateTime?.utc;

    const localTimeHour = dayjs(flightData?.departure?.dateTime?.local);
    const utcTimeHour = dayjs(flightData?.departure?.dateTime?.utc);
    const timeDifference = utcTimeHour.diff(localTimeHour, 'hour');

    if (!slot) {
      return setMessage(availabilityMessagess[BAD_USER_INPUT]);
    }

    const utcStartDate = formatDateUTC(
      slot?.startDate,
      DATE_TIME_FORMAT,
      timeDifference
    );
    const utcEndDate = formatDateUTC(
      slot?.endDate,
      DATE_TIME_FORMAT,
      timeDifference
    );

    const utcDepartureTime = formatDate(
      new Date(`${departureTime}`),
      DATE_TIME_FORMAT
    );

    if (!linkedAccountId) {
      log(`[createBooking error] linkedAccountId == ${linkedAccountId}`);
    }

    const bookingInput = {
      ...(linkedAccountId && { actingAccount: linkedAccountId }),
      experience: { id: lounge?.id },
      bookedFrom: utcStartDate,
      lastArrival: utcEndDate,
      bookedTo: utcDepartureTime,
      type: BookingType.ReservationFeeOnly,
      guestAdultCount: adults,
      guestChildrenCount: children,
      guestInfantCount: infants,
      metadata: {
        flightNumber,
        flightTime,
      },
    };

    log('[createBooking] linkedAccountId: ', linkedAccountId);
    log('[createBooking] bookingInput: ', JSON.stringify(bookingInput));
    log(
      '[createBooking] bookingInput.actingAccount: ',
      bookingInput.actingAccount
    );

    mutate({ variables: { bookingInput } }).then((response) => {
      log(
        '[createBooking] createBooking response: ',
        JSON.stringify(response || null)
      );
      const badUserInputError = getError(response, BAD_USER_INPUT);
      if (badUserInputError) {
        return setMessage(availabilityMessagess[BAD_USER_INPUT]);
      } else if (response.data?.createBooking) {
        booking.bookingId = response.data.createBooking.id;

        setBooking(booking);

        router.push({
          pathname: '/confirm-booking',
        });
      }
    });
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

  const handleSelectSlot = (value: string) => {
    setSelectedslot(value);
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
            {airportMismatch && <h1>Airports don&apos;t match</h1>}
            {terminalMismatch && <h1>Terminals don&apos;t match</h1>}
            <div>
              {airportMismatch && (
                <p>
                  The lounge you are booking is not in the same airport your
                  flight is scheduled to depart from.
                </p>
              )}
              {terminalMismatch && (
                <p>
                  The lounge you are booking is not in the same terminal your
                  flight is scheduled to depart from.{' '}
                </p>
              )}
              <p>Do you still want to go ahead with this booking?</p>
            </div>
          </div>
        </BookingLightbox>
      )}
      <Stack
        spacing={16}
        sx={{
          background: colors.background,

          '@media (max-width: 768px)': {
            width: '100%',
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack sx={{ width: '100%' }}>
          <TopBarLinks />
        </Stack>
        <Flex
          direction="column"
          sx={{
            width: '100%',

            '@media (max-width: 768px)': {
              width: '100%',
            },
          }}
        >
          <Stack
            spacing={10}
            sx={{
              width: '591px',
              margin: '0 auto',
              '@media (max-width: 768px)': {
                width: '100%',
                margin: '0',
              },
            }}
          >
            <Center
              sx={{
                padding: '0',
                margin: '10 0px',

                '@media (min-width: 768px)': {
                  display: 'none',
                },
              }}
            >
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                Arrival time selection
              </Heading>
            </Center>
            <LoungeInfo lounge={lounge} loading={!lounge} />
            {!linkedAccountId && (
              <Notification>Linked account ID could not be found</Notification>
            )}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              sx={{
                justifyContent: 'center',

                '@media (max-width: 768px)': {
                  justifyContent: 'initial',
                  backgroundColor: colors.background,
                  width: '100%',
                },
              }}
            >
              {!lounge && <BookingFormSkeleton />}
              {lounge && (
                <Box
                  sx={{
                    '@media (max-width: 768px)': {
                      width: '100%',
                    },
                  }}
                >
                  {lounge && (
                    <Stack spacing={8}>
                      {message && <Notification>{message}</Notification>}
                      <EditableTitle title="Flight details" to="/" as="h2">
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

                      <Flex
                        direction={{ base: 'column', lg: 'row' }}
                        justify={'space-between'}
                        sx={{
                          width: '100%',
                          borderBottom: `1px solid ${colors.borderSection}`,

                          '@media (max-width: 768px)': {
                            width: '100%',
                            border: 'none',
                            padding: '0px',
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

                      <EditableTitle
                        title="Estimated time of arrival"
                        as="h2"
                        showBorder={true}
                      >
                        <Flex
                          align={'center'}
                          gap={'xs'}
                          sx={{
                            '@media (max-width: 768px)': {
                              alignItems: 'flex-start',
                            },
                          }}
                        >
                          <ActionIcon
                            sx={{
                              color: '#000',
                              svg: {
                                width: 20,
                                height: 20,
                              },
                            }}
                          >
                            <Warning />
                          </ActionIcon>
                          <p
                            style={{
                              padding: '0',
                              margin: '0',
                              paddingLeft: '10',
                            }}
                          >
                            Timeslots are shown in the time zone of the lounge
                            location
                          </p>
                        </Flex>
                        {slotsData ? (
                          <AvailableSlots
                            onSelectSlot={handleSelectSlot}
                            availableSlots={slotsData?.getAvailableSlots}
                          />
                        ) : null}

                        <AvailableSlotsErrorHandling
                          error={slotsError}
                          airportMismatch={airportMismatch}
                        ></AvailableSlotsErrorHandling>
                        <div>
                          This is the time you will arrive at the lounge.
                        </div>
                        <Flex
                          align={'center'}
                          gap={'xs'}
                          sx={{
                            '@media (max-width: 768px)': {
                              alignItems: 'flex-start',
                            },
                          }}
                        >
                          <ActionIcon
                            sx={{
                              color: '#000',
                              svg: {
                                width: 20,
                                height: 20,
                              },
                            }}
                          >
                            <Clock />
                          </ActionIcon>
                          <p
                            style={{
                              padding: '0',
                              margin: '0',
                              paddingLeft: '10',
                            }}
                          >
                            As your flight is at{' '}
                            <strong>{flightTimeToDisplay}</strong>, your maximum
                            stay is <strong>3 hours prior</strong>.
                          </p>
                        </Flex>
                      </EditableTitle>
                      <EditableTitle
                        title="Cancellation policy"
                        as="h2"
                        showBorder={false}
                      >
                        <p style={{ padding: '0', margin: '0' }}>
                          Cancel up to 48 hours before your booking to receive a
                          full refund. Bookings cannot be cancelled within 48
                          hours of booking arrival time, including new bookings
                          made within that time range.
                        </p>
                        <div>
                          <p style={{ padding: '0', margin: '0' }}>
                            Please confirm details are correct before making
                            payment.
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
              hasLoungeCapacity(slotsError) ||
              hasLoungeCapacityDefaultError(slotsError)
            }
            type="submit"
            data-testid="submit"
            onClick={handleSubmit}
            sx={{
              '@media (max-width: 768px)': {
                marginTop: '10px',
              },
            }}
          >
            CONFIRM
          </Button>
        </Center>
      </Stack>
    </Layout>
  );
}

CheckAvailability.getLayout = (page: JSX.Element) => <>{page}</>;

import { useLazyQuery, useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import {
  Box,
  Flex,
  Stack,
  Button,
  Center,
} from '@collinsonx/design-system/core';
import {
  BookingType,
  ProductType,
} from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import { Details } from '@collinsonx/design-system';
import createBooking from '@collinsonx/utils/mutations/createBooking';
import { useMemo, useState, useContext, useEffect } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import {
  AvailableSlots,
  hasLoungeCapacity,
  availableSlotsNotEnoughCapacityParser,
} from '@components/flightInfo/availability';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { validateFlightNumber } from '../utils/flightValidation';
import { FlightDetails, Slots } from '@collinsonx/utils';
import getFlightDetails from '@collinsonx/utils/queries/getFlightDetails';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_TIME_FORMAT,
  TRAVEL_TYPE,
} from '../config/Constants';
import { formatDate, formatDateUTC } from '../utils/DateFormatter';
import usePayload from 'hooks/payload';
import { InfoGroup } from '@collinsonx/design-system/components/details';
import { BookingContext } from 'context/bookingContext';
import dayjs from 'dayjs';
import { constants } from '../constants';
import colors from 'ui/colour-constants';
import BackToLounge from '@components/BackToLounge';
import BookingLightbox from '@collinsonx/design-system/components/bookinglightbox';
import Price from '@components/Price';
import Notification from '@components/Notification';
import { InfoPanel } from 'utils/PanelInfo';
import { GuestCount } from '@components/guests/GuestCount';

function AvailableSlotsErrorHandling(slotsError: any) {
  const ENOUGH_CAPACITY_ERROR_IS_VALID = hasLoungeCapacity(slotsError);

  if (ENOUGH_CAPACITY_ERROR_IS_VALID) {
    return availableSlotsNotEnoughCapacityParser(slotsError);
  }

  return null;
}

export default function ConfirmAvailability() {
  const router = useRouter();

  const { getBooking, setBooking } = useContext(BookingContext);

  const [selectedslot, setSelectedslot] = useState<string>('');
  const { referrerUrl, lounge, linkedAccountId } = usePayload();
  const [airportMismatch, setAirportMismatch] = useState(false);
  const [terminalMismatch, setTerminalMismath] = useState(false);
  const [flightInfoAirport, setFlightInfoAirport] = useState('');
  const [env, setEnv] = useState<string>();

  useEffect(() => {
    if (
      window.location.href.includes('uat') ||
      window.location.href.includes('test')
    ) {
      setEnv('test');
    } else {
      setEnv('prod');
    }
  }, []);

  const booking = getBooking();

  const { flightNumber, departureDate, children, adults, infants } = booking;

  const flightCode = useMemo(
    () =>
      flightNumber ? validateFlightNumber(flightNumber as string) : undefined,

    [flightNumber]
  );

  booking.arrival = selectedslot;
  setBooking(booking);

  const [mutate, { loading: cbLoading, error: cbError }] =
    useMutation(createBooking);

  const findSelectedSlot = (slots: Slots[] | undefined, value: string) => {
    const slot = slots?.find((slot) => {
      const startDate = formatDateUTC(slot.startDate, TIME_FORMAT);
      const endDate = formatDateUTC(slot.endDate, TIME_FORMAT);
      const slotLabel = ` ${startDate}-${endDate}`;
      return slotLabel === value;
    });
    return slot;
  };

  const handleSubmit = () => {
    const availableSlots = slotsData?.getAvailableSlots.slots;
    const slot = findSelectedSlot(availableSlots, selectedslot);

    const departureTime =
      flightData?.getFlightDetails[0]?.departure?.dateTime?.local;

    const formattedDepartureTime = formatDate(
      new Date(String(departureTime)),
      DATE_TIME_FORMAT
    );

    if (!linkedAccountId) {
      console.log(
        `[createBooking error] linkedAccountId == ${linkedAccountId}`
      );
    }

    const bookingInput = {
      ...(linkedAccountId && { actingAccount: linkedAccountId }),
      experience: { id: lounge?.id },
      bookedFrom: slot?.startDate,
      lastArrival: slot?.endDate,
      bookedTo: formattedDepartureTime,
      type: BookingType.ReservationFeeOnly,
      guestAdultCount: adults,
      guestChildrenCount: children,
      guestInfantCount: infants,
      metadata: {
        flightNumber,
        flightTime,
      },
    };

    mutate({
      variables: { bookingInput },
      onCompleted(data) {
        if (data?.createBooking) {
          booking.bookingId = data.createBooking.id;

          setBooking(booking);

          router.push({
            pathname: '/confirm-booking',
          });
        }
      },
    });
  };

  const [
    fetchSlots,
    { loading: slotsLoading, error: slotsError, data: slotsData },
  ] = useLazyQuery<{
    getAvailableSlots: Availability;
  }>(getAvailableSlots);

  const {
    data: flightData,
    loading: flightDataLoading,
    error: flightDataError,
  } = useQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightCode ? flightCode[1] : '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: formatDate(new Date(String(departureDate)), DATE_FORMAT),
        flightNumber: flightCode ? flightCode[2] : '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    skip: !lounge || !env,
    onCompleted: (flightInfoData) => {
      if (flightInfoData) {
        const airport = flightInfoData.getFlightDetails[0]?.departure?.airport;
        const terminal =
          flightInfoData.getFlightDetails[0]?.departure?.terminal;

        const airportCode = lounge?.location?.airportCode;

        // TODO - Once the data is checked and terminals are ok
        /// const loungeTerminal = lounge?.location?.terminal?.split(' ')[1];

        setFlightInfoAirport(airport ?? '');

        const sameAirport =
          airportCode?.toLocaleLowerCase() === airport?.toLocaleLowerCase();

        // const sameTerminal =
        //   loungeTerminal?.toLocaleLowerCase() === terminal?.toLocaleLowerCase();

        if (!sameAirport) {
          setAirportMismatch(true);
        }

        fetchSlots({
          variables: {
            data: {
              flightInformation: {
                type: TRAVEL_TYPE,
                dateTime:
                  flightInfoData?.getFlightDetails[0]?.departure?.dateTime
                    ?.local,
                airport:
                  flightInfoData?.getFlightDetails[0]?.departure?.airport,
                terminal: '-1',
              },
              guests: {
                adultCount: adults,
                childrenCount: children,
                infantCount: infants,
              },
              product: {
                productType: ProductType.Lounge,
                productID:
                  env === 'prod'
                    ? lounge?.partnerIdProd
                    : lounge?.partnerIdTest,
                supplierCode: lounge?.partnerIntegrationId,
              },
            },
          },
        });
      }
    },
  });
  const departureTime =
    flightData?.getFlightDetails[0]?.departure?.dateTime?.local;

  const departureDateToRender = formatDate(
    new Date(`${departureDate}`),
    DATE_FORMAT
  );

  const dayjsDepartureTime = dayjs(departureTime, {
    format: 'YYYY-MM-DD HH:mm',
  });
  const flightTime = dayjsDepartureTime.format(constants.TIME_FORMAT);
  const flightTimeToDisplay = dayjsDepartureTime.format(
    constants.TIME_FORMAT_DISPLAY
  );

  const handleSelectSlot = (value: string) => {
    setSelectedslot(value);
  };

  const showAlert = airportMismatch || terminalMismatch;

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
          onClose={() => {
            if (window) {
              window.location.href = referrerUrl ?? '/';
            }
          }}
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
          <BackToLounge />
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
            spacing={24}
            sx={{
              width: '591px',
              margin: '0 auto',
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
            {!linkedAccountId && (
              <Notification>Linked account ID could not be found</Notification>
            )}
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              gap={{ base: 'sm', sm: 'lg' }}
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
                          width: '87%',

                          '@media (max-width: 768px)': {
                            width: '100%',
                          },
                        }}
                      >
                        <EditableTitle title="Who's coming" as="h2">
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

                      <EditableTitle title="" as="h2">
                        {slotsData ? (
                          <AvailableSlots
                            onSelectSlot={handleSelectSlot}
                            availableSlots={slotsData?.getAvailableSlots}
                          />
                        ) : null}

                        <AvailableSlotsErrorHandling
                          slotsError={slotsError}
                        ></AvailableSlotsErrorHandling>
                        <div>
                          This is a rough estimate so that lounge can prepare
                          for your arrival
                        </div>
                      </EditableTitle>
                      <EditableTitle title="Cancelation policy" as="h2">
                        <p style={{ padding: '0', margin: '0' }}>
                          Cancel up to 48 hours before your booking to receive a
                          full refund. Bookings cannot be cancelled within 48
                          hours of booking arrival time, including new bookings
                          made within that time range.
                        </p>
                        <div>
                          <p>
                            As your flight is at {flightTimeToDisplay}, your
                            maximum stay is 3 hours prior.
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
            disabled={slotsLoading || cbLoading}
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

ConfirmAvailability.getLayout = (page: JSX.Element) => <>{page}</>;

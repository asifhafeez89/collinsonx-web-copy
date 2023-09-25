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
import Link from 'next/link';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useMemo, useState, useContext, useEffect } from 'react';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { Availability } from '@collinsonx/utils';
import AvailableSlots from '@components/flightInfo/AvailableSlots';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { validateFlightNumber } from '../utils/flightValidation';
import { FlightDetails, Slots } from '@collinsonx/utils';
import getFlightDetails from '@collinsonx/utils/queries/getFlightDetails';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REDABLE_FORMAT,
  DATE_TIME_FORMAT,
  LOUNGE,
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
      fligtData?.getFlightDetails[0]?.departure?.dateTime?.utc;
    const formattedDepartureTime = formatDateUTC(
      new Date(String(departureTime)),
      DATE_TIME_FORMAT
    );

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
        flightTime: dayjs(departureDate).format(constants.TIMEFORMAT),
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
    data: fligtData,
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
        const airport = flightInfoData.getFlightDetails[0].departure?.airport;
        const terminal = flightInfoData.getFlightDetails[0].departure?.terminal;

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
                  flightInfoData?.getFlightDetails[0].departure?.dateTime
                    ?.local,
                airport: flightInfoData?.getFlightDetails[0].departure?.airport,
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

  const handleSelectSlot = (value: string) => {
    setSelectedslot(value);
  };

  const infos = [
    {
      header: 'Day of flight',
      description: formatDate(
        new Date(
          `${fligtData?.getFlightDetails[0]?.departure?.dateTime?.local}`
        ),
        DATE_REDABLE_FORMAT
      ),
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Time of flight',
      description: formatDate(
        new Date(
          `${fligtData?.getFlightDetails[0]?.departure?.dateTime?.local}`
        ),
        TIME_FORMAT
      ),
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Flight number',
      description: flightNumber,
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  const showAlert = airportMismatch || terminalMismatch;

  return (
    <Layout>
      {showAlert && (
        <BookingLightbox
          open={true}
          ctaCancel="Go back"
          ctaForward="Cancel booking"
          ctaForwardCall={() =>
            router.push({
              pathname: '/',
            })
          }
          onClose={() => {
            if (window) {
              window.location.href = referrerUrl ?? '/';
            }
          }}
        >
          <div>
            {airportMismatch && <h1>Airport Mismatch</h1>}
            {terminalMismatch && <h1>Terminal Mismatch</h1>}
            <div>
              {airportMismatch && (
                <p>
                  Please note, that the lounge you are booking is not in the
                  airport your flight is scheduled.{' '}
                </p>
              )}

              {terminalMismatch && (
                <p>
                  Please note, that the lounge you are booking is not in the
                  terminal your flight is scheduled.{' '}
                </p>
              )}

              <p>
                {' '}
                Lounge airport is{' '}
                <strong>{lounge?.location?.airportName}</strong>.{' '}
              </p>

              <p>
                {' '}
                Lounge terminal is <strong>{lounge?.location?.terminal}</strong>
                .{' '}
              </p>

              <p>
                {' '}
                Flight departure airport is {flightInfoAirport}. Do you still
                want to book this lounge even it is not in the airport of
                departure?
              </p>
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
                        <Details infos={infos as InfoGroup[]} direction="row" />
                      </EditableTitle>

                      <EditableTitle title="Who's coming" to="/" as="h2">
                        <Flex gap={10}>
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
                        {slotsData ? (
                          <AvailableSlots
                            onSelectSlot={handleSelectSlot}
                            availableSlots={slotsData?.getAvailableSlots}
                          />
                        ) : null}
                        <div>
                          This is a rough estimate so that lounge can prepare
                          for your arrival
                        </div>
                      </EditableTitle>

                      <EditableTitle title="Cancelation policy" as="h2">
                        <p style={{ padding: '0', margin: '0' }}>
                          Free cancellation for 24 hours. Cancel before [date of
                          flight] for a partial refund.
                        </p>
                        <Link href="cancelation-policy">Learn more</Link>
                        <div>
                          <p>
                            As your flight is at 7:00am, your maximum stay is 3
                            hours prior.
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

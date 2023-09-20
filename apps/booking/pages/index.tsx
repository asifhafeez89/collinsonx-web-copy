import Layout from '@components/Layout';
import { useContext, useMemo, useState } from 'react';
import {
  Flex,
  Stack,
  Box,
  Button,
  Center,
  Text,
} from '@collinsonx/design-system/core';
import { useForm } from '@mantine/form';
import { LoungeInfo } from '@components/LoungeInfo';
import { FlightInfo } from '../components/flightInfo/FlightInfo';
import GuestInfo from '@components/GuestInfo';
import { BookingGuests, ViewStep } from 'types/booking';
import { Availability, FlightDetails } from '@collinsonx/utils';
import { getAvailableSlots, getFlightDetails } from '@collinsonx/utils/queries';
import {
  AIRPORT_CODE_TYPE,
  DATE_FORMAT,
  OAG_API_VERSION,
} from 'config/Constants';
import { useLazyQuery } from '@collinsonx/utils/apollo';
import { validateFlightNumber } from '../utils/flightValidation';
import LoungeError from '@components/LoungeError';
import dayjs, { Dayjs } from 'dayjs';
import Breadcramp from '@components/Breadcramp';
import usePayload from 'hooks/payload';
import router from 'next/router';

import { BookingContext } from 'context/bookingContext';
import colors from 'ui/colour-constants';
import { FAQLink } from 'utils/FAQLinks';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import { MAX_GUESTS } from '../constants';
interface DepartureFlightInfo {
  airport: { iata: string };
  date: { local: string; utc: string };
  terminal: string;
  time: { local: string; utc: string };
}

interface FlightInfo {
  departure: DepartureFlightInfo;
  arrival: DepartureFlightInfo;
}

const Lounge = () => {
  const [step, setStep] = useState<ViewStep>('EDIT');
  const [date, setDate] = useState<string>(dayjs().format(DATE_FORMAT));
  const [flightNumber, setFlightNumber] = useState<string>();
  const [guestError, setGuestError] = useState<Boolean>(false);
  const { payload, lounge } = usePayload();

  const { setBooking } = useContext(BookingContext);

  const flightCode = useMemo(
    () => (flightNumber ? validateFlightNumber(flightNumber) : undefined),
    [flightNumber]
  );

  const form = useForm({
    initialValues: {
      flightNumber: '',
      departureDate: null,
      adults: 0,
      children: 0,
      infants: 0,
    },
    transformValues: (values) => ({
      ...values,
      flightNumber: values.flightNumber.toUpperCase(),
    }),
    validate: {
      flightNumber: (value: string) =>
        /^([A-Z]{3}|[A-Z\d]{2})(?:\s?)(\d{1,4})$/.test(value.toUpperCase())
          ? null
          : 'Invalid flight number',
    },
  });

  type FormValues = typeof form.values;

  const [
    fetchFlightInfo,
    {
      loading: flightInfoLoading,
      error: flightInfoError,
      data: flightInfoData,
    },
  ] = useLazyQuery<{
    getFlightDetails: FlightDetails[];
  }>(getFlightDetails, {
    variables: {
      flightDetails: {
        carrierCode: flightCode ? flightCode[1] : '',
        codeType: AIRPORT_CODE_TYPE,
        departureDate: date,
        flightNumber: flightCode ? flightCode[2] : '',
        version: OAG_API_VERSION,
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  });

  const handleClickCheckAvailability = (values: FormValues) => {
    form.validate();
    if (values.children + values.adults + values.infants > MAX_GUESTS) {
      setGuestError(true);
      return false;
    } else {
      setGuestError(false);
    }

    const query = router.query;
    setBooking(values);

    router.push({
      pathname: '/check-availability',
      query: {
        ...query,
      },
    });
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleClickCheckAvailability)}>
        <Stack spacing={16}>
          <Stack sx={{ width: '100%' }}>
            <Breadcramp
              lefttitle={`BACK TO ${lounge?.loungeName?.toUpperCase()}`}
              lefturl="/"
              righttile={`FAQs`}
              righturl={FAQLink(payload?.accountProvider)}
            />
          </Stack>
          <Flex
            align="center"
            sx={{
              justifyContent: 'center',

              '@media (max-width: 768px)': {
                backgroundColor: colors.background,
                width: '100%',
                margin: '0',
                padding: '0',
                justifyContent: 'initial',
              },
            }}
          >
            <Stack
              spacing={24}
              sx={{
                maxWidth: '591px',

                '@media (max-width: 768px)': {
                  maxWidth: '100%',
                },
              }}
            >
              <LoungeInfo
                guests={{
                  adults: form.getInputProps('adults').value,
                  children: form.getInputProps('children').value,
                  infants: form.getInputProps('infants').value,
                }}
                lounge={lounge}
                loading={!lounge}
              />
              <FlightInfo form={form} loading={!lounge || flightInfoLoading} />
              <LoungeError error={flightInfoError} />

              {guestError ? (
                <Box
                  sx={{
                    '@media (max-width: 768px)': {
                      backgroundColor: colors.white,
                      padding: '1.2rem',
                    },
                  }}
                >
                  <Box
                    p={16}
                    style={{
                      backgroundColor: 'rgba(212, 42, 84, 0.1)',
                      border: '2px solid #D42A54',
                      borderRadius: 8,
                    }}
                  >
                    <Flex
                      direction="row"
                      justify="flex-start"
                      gap="4px"
                      style={{ height: '100%' }}
                    >
                      <Box
                        sx={{
                          '@media (max-width: 768px)': {
                            paddingTop: '0.2rem',
                          },
                        }}
                      >
                        <AlertIcon style={{ width: 24, height: 24 }} />
                      </Box>

                      <Text
                        size={16}
                        align="left"
                        fw={400}
                        style={{ wordWrap: 'break-word' }}
                      >
                        The maximum capacity of the lounge is a total of{' '}
                        {MAX_GUESTS} guests.
                      </Text>
                    </Flex>
                  </Box>
                </Box>
              ) : (
                ''
              )}

              <GuestInfo form={form} loading={!lounge} />
              <Center w="100%">
                <Button disabled={!lounge || flightInfoLoading} type="submit">
                  CHECK AVAILABILITY
                </Button>
              </Center>
            </Stack>
          </Flex>
        </Stack>
      </form>
    </Layout>
  );
};

export default Lounge;

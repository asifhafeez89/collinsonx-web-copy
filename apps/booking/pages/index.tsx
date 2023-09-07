import Layout from '@components/Layout';
import { useMemo, useState } from 'react';
import {
  Flex,
  Stack,
  Box,
  Button,
  Center,
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
import dayjs from 'dayjs';
import { Breadcramp } from '@collinsonx/design-system';
import usePayload from 'hooks/payload';

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
  const { payload, lounge } = usePayload();
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
      seniors: 0,
    },
    validate: {
      flightNumber: (value: string) =>
        /^([A-Z]{3}|[A-Z\d]{2})(?:\s?)(\d{1,4})$/.test(value.toUpperCase())
          ? null
          : 'Invalid flight number',
    },
  });

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

  const handleClickCheckAvailability = () => {
    form.validate();
    console.log(form.errors);
  };

  return (
    <Layout>
      <form onSubmit={form.onSubmit(handleClickCheckAvailability)}>
        <Stack spacing={16}>
          <Stack sx={{ width: '100%' }}>
            <Breadcramp
              lefttitle={`BACK TO ${lounge?.loungeName?.toUpperCase()}`}
              lefturl="https://bbc.co.uk"
              righttile={`FAQs`}
              righturl="https://bbc.co.uk"
            />
          </Stack>
          <Flex justify="center" align="center">
            <Stack maw={591} spacing={24}>
              <LoungeInfo lounge={lounge} loading={!lounge} />
              <FlightInfo form={form} loading={!lounge || flightInfoLoading} />
              <LoungeError error={flightInfoError} />
              <Box sx={{ borderBottom: '1px solid  #C8C9CA' }} />
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

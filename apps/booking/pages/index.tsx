import Layout from '@components/Layout';
import { useMemo, useState } from 'react';
import {
  Anchor,
  Group,
  Flex,
  Stack,
  Box,
  Button,
  Center,
  Skeleton,
} from '@collinsonx/design-system/core';

import { LoungeInfo } from '@components/LoungeInfo';
import {
  AvailabilitySlot,
  FlightInfo,
} from '../components/flightInfo/FlightInfo';
import GuestInfo from '@components/GuestInfo';
import usePayload from 'hooks/payload';
import { BookingGuests, ViewStep } from 'types/booking';
import { ArrowLeft } from '@collinsonx/design-system/assets/icons';
import { Availability, FlightDetails } from '@collinsonx/utils';
import { getAvailableSlots, getFlightDetails } from '@collinsonx/utils/queries';
import {
  AIRPORT_CODE_TYPE,
  DATE_FORMAT,
  LOUNGE,
  OAG_API_VERSION,
  TRAVEL_TYPE,
} from 'config/Constants';

import { useLazyQuery } from '@collinsonx/utils/apollo';

import { validateFlightNumber } from '../utils/flightValidation';
import FlightData from '@components/flightInfo/FlightData';
import AvailableSlots from '@components/flightInfo/AvailableSlots';
import LoungeError from '@components/LoungeError';
import dayjs from 'dayjs';
import { Breadcramp } from '@collinsonx/design-system';

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
  const [guests, setGuests] = useState<BookingGuests>({
    adults: 0,
    children: 0,
    infants: 0,
    seniors: 0,
  });

  const [flightData, setFlightData] = useState<FlightInfo>();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot>();
  const { payload, lounge } = usePayload();

  const handleChangeGuests = (type: keyof BookingGuests, value: number) => {
    setGuests((prev) => ({ ...prev, [type]: value }));
  };

  const flightCode = useMemo(
    () => (flightNumber ? validateFlightNumber(flightNumber) : undefined),

    [flightNumber]
  );

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
    fetchFlightInfo();
  };

  console.log(flightNumber);

  return (
    <Layout>
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
            <FlightInfo
              step={step}
              date={date}
              loading={!lounge || flightInfoLoading}
              onChangeDate={setDate}
              flightNumber={flightNumber}
              onChangeFlightNumber={setFlightNumber}
            />
            <LoungeError error={flightInfoError} />
            <Box sx={{ borderBottom: '1px solid  #C8C9CA' }} />
            <GuestInfo
              step={step}
              guests={guests}
              loading={!lounge}
              onChangeGuests={handleChangeGuests}
            />
            <Center w="100%">
              <Button
                disabled={!lounge || flightInfoLoading}
                onClick={handleClickCheckAvailability}
              >
                CHECK AVAILABILITY
              </Button>
            </Center>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
};

export default Lounge;

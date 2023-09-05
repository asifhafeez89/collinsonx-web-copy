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
import { FlightDetails } from '@collinsonx/utils';
import { getFlightDetails } from '@collinsonx/utils/queries';
import {
  AIRPORT_CODE_TYPE,
  DATE_FORMAT,
  OAG_API_VERSION,
} from 'config/Constants';

import { formatDate } from '../utils/DateFormatter';
import { useLazyQuery, useQuery } from '@collinsonx/utils/apollo';

import { validateFlightNumber } from '../utils/flightValidation';
import dayjs from 'dayjs';
import FlightData from '@components/flightInfo/FlightData';

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
  const [date, setDate] = useState<string>();
  const [flightNumber, setFlightNumber] = useState<string>();
  const [guests, setGuests] = useState<BookingGuests>({
    adults: 0,
    children: 0,
    infants: 0,
    seniors: 0,
  });

  const [flightData, setFlightData] = useState<FlightInfo>();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot>();

  const handleChangeGuests = (type: keyof BookingGuests, value: number) => {
    setGuests((prev) => ({ ...prev, [type]: value }));
  };

  const onFlightInfoSuccess = (flightInfo: FlightInfo) => {
    setFlightData(flightInfo);
  };

  const onSetSelectedSlot = (selectedSlot: AvailabilitySlot) => {
    setSelectedSlot(selectedSlot);
  };

  const { payload, lounge } = usePayload();

  const flightCode = useMemo(
    () => (flightNumber ? validateFlightNumber(flightNumber) : undefined),

    [flightNumber]
  );

  console.log('flightCode ', flightCode);

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
    onCompleted: (data) => {
      /*setFlightData(data?.getFlightDetails[0]);
      onSuccess(data?.getFlightDetails[0]);*/
    },
  });

  console.log(date);

  const handleClickCheckAvailability = () => {
    fetchFlightInfo();
  };

  return (
    <Layout>
      <Stack spacing={16}>
        <Group mx={120} position="apart">
          <Group spacing={4}>
            <Skeleton visible={!lounge}>
              <ArrowLeft />
              <Anchor href="#">
                BACK TO {lounge?.loungeName?.toUpperCase()}
              </Anchor>
            </Skeleton>
          </Group>
          <Anchor href="#" target="_blank">
            FAQs
          </Anchor>
        </Group>
        <Flex justify="center" align="center">
          <Stack maw={591} spacing={24}>
            <LoungeInfo lounge={lounge} loading={!lounge} />
            {!flightInfoData ? (
              <FlightInfo
                step={step}
                date={date}
                loading={!lounge || flightInfoLoading}
                onChangeDate={setDate}
                flightNumber={flightNumber}
                onChangeFlightNumber={setFlightNumber}
              />
            ) : (
              <FlightData flightInfoData={flightInfoData?.getFlightDetails} />
            )}
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

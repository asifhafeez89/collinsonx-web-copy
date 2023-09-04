import Layout from '@components/Layout';
import { useMemo, useState } from 'react';
import { useQuery } from '@collinsonx/utils/apollo';
import {
  Anchor,
  Group,
  Flex,
  Stack,
  Box,
  Button,
  Text,
  Center,
} from '@collinsonx/design-system/core';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getSearchExperiences } from '@collinsonx/utils/queries';

import { LoungeInfo } from '@components/LoungeInfo';
import {
  AvailabilitySlot,
  FlightInfo,
} from '../components/flightInfo/FlightInfo';
import GuestInfo from '@components/GuestInfo';
import usePayload from 'hooks/payload';
import { BookingGuests, ViewStep } from 'types/booking';
import { ArrowLeft } from '@collinsonx/design-system/assets/icons';

interface MainProps {
  consumerNumber: string | string[];
  tempBearerToken: string | string[];
}

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
  const router = useRouter();

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

  const handleClickCheckAvailability = () => {};

  const handleChangeGuests = (type: keyof BookingGuests, value: number) => {
    setGuests((prev) => ({ ...prev, [type]: value }));
  };

  const onFlightInfoSuccess = (flightInfo: FlightInfo) => {
    setFlightData(flightInfo);
  };

  const onSetSelectedSlot = (selectedSlot: AvailabilitySlot) => {
    setSelectedSlot(selectedSlot);
  };

  const {
    loading: loadingExperience,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const { payload, loungeCode } = usePayload();

  const lounge = useMemo(() => {
    return experienceData?.searchExperiences.filter(
      (item) => item.loungeCode === loungeCode
    )[0];
  }, [experienceData]);

  return (
    <Layout>
      <Group mx={120} position="apart">
        <Group spacing={4}>
          <ArrowLeft />
          <Anchor href="#">BACK TO LOUNGE</Anchor>
        </Group>
        <Anchor href="#" target="_blank">
          FAQs
        </Anchor>
      </Group>
      <Flex justify="center" align="center">
        {!lounge && !loadingExperience ? (
          <Text>Could not find lounge</Text>
        ) : (
          <Stack maw={591} spacing={24}>
            <LoungeInfo lounge={lounge} loading={loadingExperience} />
            <FlightInfo
              step={step}
              date={date}
              onChangeDate={setDate}
              flightNumber={flightNumber}
              onChangeFlightNumber={setFlightNumber}
            />
            <Box sx={{ borderBottom: '1px solid  #C8C9CA' }} />
            <GuestInfo
              step={step}
              guests={guests}
              onChangeGuests={handleChangeGuests}
            />
            <Center w="100%">
              <Button onClick={handleClickCheckAvailability}>
                CHECK AVAILABILITY
              </Button>
            </Center>
          </Stack>
        )}
      </Flex>
    </Layout>
  );
};

export default Lounge;

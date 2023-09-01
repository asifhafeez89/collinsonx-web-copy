import Layout from '@components/Layout';
import { useMemo, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@collinsonx/utils/apollo';
import { Anchor, Group, Flex, Button } from '@collinsonx/design-system/core';
import { Breadcramp } from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
} from '@collinsonx/design-system';
import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { LoungeInfo } from '@components/LoungeInfo';
import { AvailabilitySlot, FlightInfo } from '../components/FlightInfo';
import GuestInfo from '@components/GuestInfo';

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
  const [flightData, setFlightData] = useState<FlightInfo>();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot>();
  const router = useRouter();

  const onFlightInfoSuccess = (flightInfo: FlightInfo) => {
    setFlightData(flightInfo);
  };

  const onSetSelectedSlot = (selectedSlot: AvailabilitySlot) => {
    setSelectedSlot(selectedSlot);
  };

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const lounge = useMemo(() => {
    const { id } = router.query;
    return experienceData?.searchExperiences?.length
      ? experienceData.searchExperiences.find((item) => item.id === id)!
      : null;
  }, [experienceData, router]);

  return (
    <Layout>
      <Group pt={16} px={120} position="apart">
        <Breadcramp title="BACK TO LOUNGE" url="https://bbc.co.uk" />
        <Anchor>FAQs</Anchor>
      </Group>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <LoungeInfo />
        <GuestInfo />
        <FlightInfo
          onSuccess={onFlightInfoSuccess}
          onSetSelectedSlot={onSetSelectedSlot}
        />
      </Flex>
    </Layout>
  );
};

export default Lounge;

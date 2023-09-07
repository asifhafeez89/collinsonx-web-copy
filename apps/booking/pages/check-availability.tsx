import Layout from '@components/Layout';
import { useMemo, useState } from 'react';
import { ApolloError, useMutation, useQuery } from '@collinsonx/utils/apollo';
import {
  AvailabilitySlot,
  FlightInfo,
} from '../components/flightInfo/FlightInfo';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import Breadcramp from '@components/Breadcramp';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useRouter } from 'next/router';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
} from '@collinsonx/design-system';
import LoungeError from '@components/LoungeError';
import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import usePayload from 'hooks/payload';

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

const CheckAvailability = () => {
  const { payload, setPayload } = usePayload();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot>();
  const [selectedGuests, setSelectedGuests] = useState<AvailabilitySlot>();
  const router = useRouter();

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

  const infos = [
    {
      header: lounge?.location?.city ?? '',
      description: '',
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: (lounge?.openingHours ?? ('' as string)).slice(0, 21) ?? '-',
      description: '',
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <Layout>
      <Stack sx={{ width: '100%' }}>
        <Breadcramp
          lefttitle={`BACK TO ${lounge?.loungeName?.toUpperCase()}`}
          lefturl="https://bbc.co.uk"
          righttile={`FAQs`}
          righturl="https://bbc.co.uk"
        />
      </Stack>
      {!loading && (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
          <LoungeError error={fetchError} />
          {lounge && (
            <Stack spacing={8}>
              <Stack p={24} spacing={24} bg="#FFF">
                <img
                  src={
                    lounge.images && lounge.images[0] && lounge.images[0].url
                      ? lounge.images[0].url
                      : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                  }
                  alt="test"
                />
              </Stack>
            </Stack>
          )}{' '}
          <Box sx={{ borderBottom: '1px solid  #C8C9CA' }}>
            <h2>{lounge?.loungeName}</h2>
            {/* <FlightInfo
              loading={loading}
              flightNumber=""
              onChangeFlightNumber={() => {}}
            /> */}
          </Box>
        </Flex>
      )}
    </Layout>
  );
};

export default CheckAvailability;

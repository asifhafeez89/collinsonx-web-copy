import React, { useState } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container, UnstyledButton } from '@collinsonx/design-system/core';
import {
  Stack,
  Flex,
  Skeleton,
  Grid,
  Text,
} from '@collinsonx/design-system/core';

import { Card } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';
import Infobox from '@collinsonx/design-system/components/infobox';
import ResultsContainer from '@collinsonx/design-system/components/resultsContainer';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import LoungeImage from '@components/LoungeImage';
import { useRouter } from 'next/router';
import LoungeError from '@components/LoungeError';
import FilterPane from '@components/FilterPane/FilterPane';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';

export default function Search() {
  const router = useRouter();
  const { query } = useRouter();

  const goToLoungeDetails = (lounge: Experience) => {
    router.push({
      pathname: '/details',
      query: { id: lounge.id, search: true },
    });
  };

  const [date, setDate] = useState<Date | null>(new Date());
  const DATE_FORMAT = 'DD/MM/YYYY';
  const form = useForm({
    initialValues: {
      flightNumber: '',
      dateofflight: new Date('1990-01-01'),
    },

    validate: {
      flightNumber: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const flightNumber = router.query?.flightnumber as string;
  const flightDate = dayjsTz(router.query?.dateofflight as string).format(
    'DD/MM/YYYY'
  );

  const { loading, error, data, refetch } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState<boolean>(false);

  const showFilters = () => {
    setIsFilterPanelOpen(true);
  };

  const hideFilters = () => {
    setIsFilterPanelOpen(false);
  };

  const handleFilters = (selectedFacilties: string[]) => {
    refetch({ query: selectedFacilties.join(',') });
  };

  return (
    <div style={{ background: '#f5f5f5', height: '100vh' }}>
      <Container
        px={8}
        sx={{
          '@media (max-width: 768px)': {
            width: '100%',
          },
          width: '375px',
          background: '#25262B',
        }}
      >
        <Stack
          spacing={10}
          sx={{
            paddingTop: '20px',
            display: 'block',
            position: 'relative',
            padding: '20px',
          }}
        >
          <Infobox
            title="Your flight details"
            flight={flightNumber}
            date={flightDate}
            handleEditClick={() => {
              router.push({
                pathname: '/search',
                query: {
                  flightnumber: flightNumber,
                  dateofflight: router.query?.dateofflight,
                },
              });
            }}
          />
        </Stack>
      </Container>
      <Container
        sx={{
          '@media (max-width: 768px)': {
            width: '100%',
          },
          width: '375px',
        }}
        p={0}
      >
        <ResultsContainer>
          <Grid
            grow
            gutter={2}
            gutterXs="md"
            gutterMd="xl"
            gutterXl={20}
            py={12}
          >
            <Grid.Col span={5} sx={{ textAlign: 'center' }}>
              Lounges ({data?.searchExperiences.length ?? 0})
            </Grid.Col>
            <Grid.Col span={1} sx={{ textAlign: 'center' }}>
              |
            </Grid.Col>
            <Grid.Col span={5} sx={{ textAlign: 'center' }}>
              <UnstyledButton onClick={showFilters}>Filter</UnstyledButton>
            </Grid.Col>
          </Grid>
          <FilterPane
            onChange={handleFilters}
            isOpen={isFilterPanelOpen}
            onClose={hideFilters}
          />
          <Flex direction="column">
            <LoungeError error={error} />
            {loading && <Skeleton visible={loading} h={390}></Skeleton>}
            {data?.searchExperiences?.map((lounge) => {
              const { loungeName, location, id, images, openingHours } = lounge;
              return (
                <Card
                  title={loungeName || '-'}
                  subtitle={location?.city || '-'}
                  openingHours={openingHours as string}
                  ImageComponent={
                    <LoungeImage width={309} height={126} images={images} />
                  }
                  price={{
                    currency: 'USD',
                    reservationCost: 20.5,
                    lifestyleXReservationCharge: 17.5,
                  }}
                  handleClick={() => {
                    goToLoungeDetails(lounge);
                  }}
                  key={id}
                />
              );
            })}
          </Flex>
        </ResultsContainer>
      </Container>
    </div>
  );
}

Search.getLayout = (page: JSX.Element) => (
  <LayoutPaddingLess>{page}</LayoutPaddingLess>
);

import React, { useState } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container } from '@collinsonx/design-system/core';
import { Stack, Flex, Skeleton, Grid } from '@collinsonx/design-system/core';

import { Card } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';
import Infobox from '@collinsonx/design-system/components/infobox';
import ResultsContainer from '@collinsonx/design-system/components/resultsContainer';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import LoungeImage from '@components/LoungeImage';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import LoungeError from '@components/LoungeError';

export default function Search() {
  const router = useRouter();

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
  const flightDate = dayjs(router.query?.dateofflight as string).format(
    'DD/MM/YYYY'
  );

  const { loading, error, data } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

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
              Lounges (3)
            </Grid.Col>
            <Grid.Col span={1} sx={{ textAlign: 'center' }}>
              |
            </Grid.Col>
            <Grid.Col span={6} sx={{ textAlign: 'center' }}>
              Filter
            </Grid.Col>
          </Grid>
          <Flex direction="column">
            <LoungeError error={error} />
            {loading && <Skeleton visible={loading} h={390}></Skeleton>}
            {data?.searchExperiences?.map((lounge) => {
              const { name, location, id, images } = lounge;
              return (
                <Card
                  title={name || '-'}
                  subtitle={location || '-'}
                  ImageComponent={
                    <LoungeImage width={309} height={126} images={images} />
                  }
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

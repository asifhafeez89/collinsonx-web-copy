import React, { useState, ComponentProps } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container } from '@collinsonx/design-system/core';
import { Stack, Flex, Skeleton, Grid } from '@collinsonx/design-system/core';

import { Card, DatePicker } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';
import Infobox from '@collinsonx/design-system/components/infobox';
import ResultsContainer from '@collinsonx/design-system/components/resultsContainer';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import LoungeImage from '@components/LoungeImage';

export default function Search() {
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

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(date as Date);
  };

  const { loading, error, data } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  return (
    <div style={{ background: '#f5f5f5', height: '100vh' }}>
      <Container sx={{ background: '#25262B' }}>
        <Stack
          spacing={10}
          sx={{
            paddingTop: '20px',
            margin: '0',
            display: 'block',
            position: 'relative',
            padding: '20px',
          }}
        >
          <Infobox
            title="Your flight details"
            flight="Date"
            date="12/6/2023"
            handleEditClick={() => {}}
          />
        </Stack>
      </Container>
      <div>
        <ResultsContainer>
          <Grid grow gutter={2} gutterXs="md" gutterMd="xl" gutterXl={20}>
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
            {loading && <Skeleton visible={loading} h={390}></Skeleton>}
            {data?.searchExperiences?.map((lounge) => {
              const { name, location, id, images, openingHours } = lounge;
              return (
                <Card
                  title={name || '-'}
                  subtitle={location || '-'}
                  ImageComponent={
                    <LoungeImage width={309} height={232} images={images} />
                  }
                  handleClick={() => {
                    /*goToLoungeDetails(lounge)*/
                  }}
                  key={id}
                />
              );
            })}
          </Flex>
        </ResultsContainer>
      </div>
    </div>
  );
}

Search.getLayout = (page: JSX.Element) => (
  <LayoutPaddingLess>{page}</LayoutPaddingLess>
);

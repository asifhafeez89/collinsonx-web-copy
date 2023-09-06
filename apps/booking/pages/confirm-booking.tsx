import { ApolloError, useMutation, useQuery } from '@collinsonx/utils/apollo';
import Layout from '@components/Layout';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
  Button,
} from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { Box, Flex, Stack } from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import createBooking from '@collinsonx/utils/mutations/createBooking';

import { Breadcramp } from '@collinsonx/design-system';
import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useMemo, useState } from 'react';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';
import EditableTitle from '@collinsonx/design-system/components/editabletitles/EditableTitle';
import { formatDate } from '../utils/DateFormatter';
import {
  AIRPORT_CODE_TYPE,
  OAG_API_VERSION,
  DATE_FORMAT,
  TIME_FORMAT,
  DATE_REDABLE_FORMAT,
} from '../config/Constants';
export default function Book() {
  const router = useRouter();

  const {
    id,
    flightNumber,
    departureDate,
    adultCount,
    childrentCount,
    arrivalTime,
  } = router.query;

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const [createLoading, setCreateLoading] = useState(false);

  const lounge = useMemo(() => {
    const { id } = router.query;
    return experienceData?.searchExperiences?.length
      ? experienceData.searchExperiences.find((item) => item.id === id)!
      : null;
  }, [experienceData, router]);

  const handleSubmit = () => {};

  const infos = [
    {
      header: 'Day of flight',
      description: formatDate(
        new Date(String(departureDate)),
        DATE_REDABLE_FORMAT
      ),
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Time of flight',
      description: formatDate(new Date(String(departureDate)), TIME_FORMAT),
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
    {
      header: 'Flight number',
      description: flightNumber,
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <Layout>
      <Stack sx={{ width: '100%' }}>
        <Breadcramp title="Back to Gatwick" url="https://bbc.co.uk" />
      </Stack>
      {createLoading ? (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        ></Flex>
      ) : (
        <Flex
          direction={{ base: 'column', sm: 'row' }}
          gap={{ base: 'sm', sm: 'lg' }}
          justify={{ sm: 'center' }}
        >
          {loading && <BookingFormSkeleton />}
          {!loading && (
            <Box>
              <LoungeError error={fetchError} />
              {lounge && (
                <Stack spacing={8}>
                  <Stack p={24} spacing={24} bg="#FFF">
                    <LoungeImageTitle
                      title={lounge.loungeName ?? ''}
                      location={'London Gatwick, North Terminal'}
                      price={'£8.00 GBP'}
                      image={
                        lounge.images &&
                        lounge.images[0] &&
                        lounge.images[0].url
                          ? lounge.images[0].url
                          : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                      }
                    />
                  </Stack>
                  <EditableTitle title="Flight details" to="/step1" as="h2">
                    <Details infos={infos} direction="row" />
                  </EditableTitle>

                  <EditableTitle title="Who's coming" to="/step1" as="h2">
                    <Flex direction="row" gap={10}>
                      <p style={{ padding: '0', margin: '0' }}>
                        {' '}
                        <strong>Adults</strong> {adultCount}
                      </p>{' '}
                      {Number(childrentCount) > 0 ? (
                        <>
                          <p style={{ padding: '0', margin: '0' }}>
                            {' '}
                            <strong>Children</strong> {childrentCount}
                          </p>
                        </>
                      ) : null}
                    </Flex>
                  </EditableTitle>

                  <EditableTitle
                    title="Estimated time of arrival"
                    to="/step1"
                    as="h2"
                  >
                    <Flex direction="row" gap={10}>
                      <p style={{ padding: '0', margin: '0' }}>{arrivalTime}</p>{' '}
                    </Flex>
                  </EditableTitle>
                </Stack>
              )}

              <Button
                type="submit"
                data-testid="submit"
                spacing="20px"
                align="center"
                handleClick={handleSubmit}
              >
                GO TO PAYMENT
              </Button>
            </Box>
          )}
        </Flex>
      )}
    </Layout>
  );
}

Book.getLayout = (page: JSX.Element) => <>{page}</>;

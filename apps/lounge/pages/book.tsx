import { Box, Flex, Skeleton, Stack } from '@collinsonx/design-system/core';
import { ApolloError, useMutation, useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
} from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';

import { useRouter } from 'next/router';
import BookingForm, { BookingFormProps } from '@components/BookingForm';
import createBooking from '@collinsonx/utils/mutations/createBooking';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';
import { useMemo, useState } from 'react';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import BookingFormSkeleton from '@components/BookingForm/BookingFormSkeleton';
import LoungeError from '@components/LoungeError';

export interface BookLoungeProps {
  id: string;
}

export default function Book() {
  const router = useRouter();

  const {
    loading,
    error: fetchError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences);

  const [createLoading, setCreateLoading] = useState(false);

  const [createBookingCall, { error: createError, data }] =
    useMutation(createBooking);

  const lounge = useMemo(() => {
    const { id } = router.query;
    return experienceData?.searchExperiences?.length
      ? experienceData.searchExperiences.find((item) => item.id === id)!
      : null;
  }, [experienceData, router]);

  const handleSubmit: BookingFormProps['onSubmit'] = (formValues) => {
    if (formValues.date && lounge) {
      setCreateLoading(true);
      createBookingCall({
        variables: {
          bookingInput: {
            bookedFrom: formValues.date,
            bookedTo: formValues.date,
            experience: {
              id: lounge.id,
            },
          },
        },
        onCompleted: (data) => {
          if (data.createBooking) {
            router.push('/success');
          }
        },
        onError: () => {
          setCreateLoading(false);
        },
      });
    }
  };

  const infos = [
    {
      header: lounge?.location?.city ?? '',
      description: '',
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header: (lounge?.openingHours ?? ('' as string)).slice(0, 20) ?? '-',
      description: '',
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <>
      {createLoading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <>
          {loading && <BookingFormSkeleton />}
          {!loading && (
            <Box maw={375} m="auto" sx={{ position: 'relative' }}>
              <Box sx={{ borderBottom: '1px solid  #C8C9CA' }}>
                <PageTitle
                  title="Confirm booking"
                  onClickBack={() =>
                    router.push(`/details?id=${router.query.id}`)
                  }
                />
              </Box>
              <LoungeError error={fetchError} />
              <LoungeError error={createError} />
              {lounge && (
                <Stack spacing={8}>
                  <Stack p={24} spacing={24} bg="#FFF">
                    <LoungeImageTitle
                      title={lounge.loungeName ?? ''}
                      image={
                        lounge.images &&
                        lounge.images[0] &&
                        lounge.images[0].url
                          ? lounge.images[0].url
                          : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                      }
                    />
                    <Details infos={infos} />
                  </Stack>

                  <BookingForm onSubmit={handleSubmit} />
                </Stack>
              )}
            </Box>
          )}
        </>
      )}
    </>
  );
}

Book.getLayout = (page: JSX.Element) => <>{page}</>;

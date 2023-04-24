import { Box, Skeleton, Stack } from '@collinsonx/design-system/core';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  LoungeImageTitle,
  Details,
} from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';

import { useRouter } from 'next/router';
import BookingForm, { BookingFormProps } from '@components/BookingForm';

import { Clock, MapPin } from '@collinsonx/design-system/assets/icons';

export interface BookLoungeProps {
  id: string;
}

export default function Book() {
  const router = useRouter();

  const {
    loading,
    error: experienceError,
    data: experienceData,
  } = useQuery<{ searchExperiences: Experience[] }>(getSearchExperiences, {
    variables: { query: router.query?.id },
  });

  const handleSubmit: BookingFormProps['onSubmit'] = (values) => {
    router.push({
      pathname: '/bookReview',
      query: {
        lounge: JSON.stringify(experienceData?.searchExperiences[0]),
        formValues: JSON.stringify(values),
      },
    });
  };

  const lounge = experienceData?.searchExperiences[0];

  const infos = [
    {
      header: lounge?.location ?? '',
      description: '',
      icon: <MapPin width={16} height={16} color="#0C8599" />,
    },
    {
      header:
        (lounge?.openingHours as unknown as string[])
          ?.join(',')
          .substring(0, 20) ?? '-',
      description: '',
      icon: <Clock width={16} height={16} color="#0C8599" />,
    },
  ];

  return (
    <>
      {loading && <Skeleton visible={loading} h={500}></Skeleton>}
      {!loading && lounge && (
        <Box maw={375} m="auto" sx={{ position: 'relative' }}>
          <Box sx={{ borderBottom: '1px solid  #C8C9CA' }}>
            <PageTitle
              title="Confirm booking"
              url={`/details?id=${lounge.id}`}
            />
          </Box>

          <Stack spacing={8}>
            <Stack p={24} spacing={24} bg="#FFF">
              <LoungeImageTitle
                title={lounge.name ?? ''}
                image={
                  lounge.images && lounge.images[0] && lounge.images[0].url
                    ? lounge.images[0].url
                    : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                }
              />
              <Details infos={infos} />
            </Stack>

            <BookingForm onSubmit={handleSubmit} />
          </Stack>
        </Box>
      )}
    </>
  );
}

Book.getLayout = (page: JSX.Element) => <>{page}</>;

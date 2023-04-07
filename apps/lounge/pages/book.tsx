import { Skeleton, Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { PageTitle, Lounge } from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';

import { useRouter } from 'next/router';
import BookingForm, { BookingFormProps } from '@components/BookingForm';

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

  return (
    <>
      {loading && <Skeleton visible={loading} h={500}></Skeleton>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle
            title={`Book ${lounge.name}`}
            url={`/details?id=${lounge.id}`}
          />
          <Lounge
            airport={lounge.location!}
            loungeName={lounge.name ?? '-'}
            openingTimes={
              (lounge?.openingHours as unknown as string[])
                ?.join(',')
                .substring(0, 20) ?? '-'
            }
            image={
              lounge.images && lounge.images.length
                ? lounge.images[0]?.url ??
                  'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
            }
          />
          <BookingForm onSubmit={handleSubmit} />
        </Stack>
      )}
    </>
  );
}

Book.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

import { Skeleton, Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import {
  PageTitle,
  Lounge,
  LoungeImageTitle,
  Details,
} from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';

import { useRouter } from 'next/router';
import BookingForm, { BookingFormProps } from '@components/BookingForm';
import Heading from '@collinsonx/design-system/components/heading/Heading';
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
      icon: <MapPin width={16} color="#0C8599" />,
    },
    {
      header:
        (lounge?.openingHours as unknown as string[])
          ?.join(',')
          .substring(0, 20) ?? '-',
      description: '',
      icon: <Clock width={16} color="#0C8599" />,
    },
  ];

  return (
    <>
      {loading && <Skeleton visible={loading} h={500}></Skeleton>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle title="Confirm booking" url={`/details?id=${lounge.id}`} />
          <LoungeImageTitle
            title={lounge.name ?? ''}
            image={
              lounge.images && lounge.images[0] && lounge.images[0].url
                ? lounge.images[0].url
                : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
            }
          />
          {infos && <Details infos={infos} />}
          <BookingForm onSubmit={handleSubmit} />
        </Stack>
      )}
    </>
  );
}

Book.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

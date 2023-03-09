import { Stack } from '@collinsonx/design-system/core';
import Layout from '@components/Layout';
import { client } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { PageTitle, Lounge } from '@collinsonx/design-system';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { NextPageContext } from 'next';
import BookingForm, { BookingFormProps } from '@components/BookingForm';
import { useRouter } from 'next/router';

export interface BookLoungeProps {
  lounge: Experience;
  loading: boolean;
}

export default function Book(props: BookLoungeProps) {
  const { lounge, loading } = props;
  const router = useRouter();

  const handleSubmit: BookingFormProps['onSubmit'] = (values) => {
    if (values.date) {
      router.push({
        pathname: '/bookReview',
        query: {
          lounge: JSON.stringify(lounge),
          formValues: JSON.stringify(values),
        },
      });
    }
  };

  return (
    <>
      {loading && <div>loading...</div>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle
            title={`Book ${lounge?.name}`}
            url={`/details?id=${lounge.id}`}
          />
          <Lounge
            airport={lounge?.location ?? '-'}
            loungeName={lounge?.name ?? '-'}
            openingTimes={
              (lounge.openingHours as unknown as string[])
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

type Lounge = {
  id: string;
};

interface QueryProps extends NextPageContext {
  lounge: Lounge;
}

export async function getServerSideProps({ query }: QueryProps) {
  const loungeId = query.id;

  const { data, loading } = await client.query({
    query: getSearchExperiences,
    variables: { query: loungeId },
  });

  return {
    props: {
      lounge: data.searchExperiences.length ? data.searchExperiences[0] : {},
      loading: loading,
    },
  };
}

Book.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

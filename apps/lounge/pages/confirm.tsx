import { Stack, Flex, UnstyledButton } from '@collinsonx/design-system/core';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import { FieldLabel, PageTitle, Lounge } from '@collinsonx/design-system';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { client } from '@collinsonx/utils/apollo';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { NextPageContext } from 'next';
import dayjs from 'dayjs';

interface BookLoungeProps {
  lounge: Experience;
  loading: boolean;
}

export default function Landing(props: BookLoungeProps) {
  const router = useRouter();
  const { lounge, loading } = props;
  const r = (router?.query?.reservationDate as string) ?? '{}';
  const reservationDate: Date = JSON.parse(r);

  const { additionalRequests } = router?.query ?? 'None';

  const handleConfirm = () => {
    // Send to email service
    // TODO

    router.push('/success');
  };

  return (
    <>
      {loading && !lounge && <div>loading...</div>}
      {!loading && lounge && (
        <Stack sx={{ position: 'relative' }}>
          <PageTitle
            title={'Confirm details'}
            url={`/lounge/book?id=${lounge.id}`}
          />
          <Lounge
            image={
              lounge.images && lounge.images.length
                ? lounge.images[0]?.url ??
                  'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
                : 'https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg'
            }
            airport={lounge?.location ?? '-'}
            openingTimes={
              (lounge.openingHours as unknown as string[])
                ?.join(',')
                .substring(0, 20) ?? '-'
            }
          />
          <Flex direction="column">
            <FieldLabel
              title="Date"
              value={dayjs(reservationDate).format('DD/MM/YYYY')}
              handleClick={() => router.push('/book')}
            />
            <FieldLabel
              title="Time of arrival"
              value={dayjs(reservationDate).format('HH:mm')}
              handleClick={() => router.push('/book')}
            />
            <FieldLabel
              title="Additional requirements"
              value={additionalRequests as string}
              handleClick={() => router.push('/book')}
            />
            <UnstyledButton
              onClick={handleConfirm}
              sx={{
                borderRadius: 8,
                background: '#000000',
                color: '#ffffff',
                padding: '12px 24px',
                width: '100%',
                textAlign: 'center',
                fontSize: '18px',
                marginBottom: '1rem',
              }}
            >
              Send booking to lounge
            </UnstyledButton>
          </Flex>
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
  const loungeId = query?.id ?? '';

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

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

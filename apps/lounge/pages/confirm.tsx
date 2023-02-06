import {
  Stack,
  Flex,
  Paper,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';

import {
  FieldLabel,
  Button,
  PageTitle,
  Lounge,
} from '@collinsonx/design-system';
import getLounge from 'gql/getLounge';
import { client } from '@collinsonx/utils/apollo';
import { NextPageContext } from 'next';
import { LoungeData } from '@collinsonx/utils/types/lounge';

interface BookLoungeProps {
  lounge: LoungeData;
  loading: boolean;
}

export default function Landing(props: BookLoungeProps) {
  const router = useRouter();
  const { lounge, loading } = props;

  const handleConfirm = () => {
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
            image={lounge?.images?.[0]?.url}
            airport={lounge?.location}
            openingTimes={lounge?.openingHours}
          />
          <Flex direction="column">
            <Paper mt={30} radius="md">
              <FieldLabel
                title="Date"
                value="12/6/2023"
                handleClick={() => router.push('/book')}
              />
            </Paper>
            <Paper mt={30} radius="md">
              <FieldLabel
                title="Time of arrival"
                value="08:30"
                handleClick={() => router.push('/book')}
              />
            </Paper>
            <Paper mt={30} radius="md">
              <FieldLabel
                title="Additional requirements"
                value="None"
                handleClick={() => router.push('/book')}
              />
            </Paper>
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
    query: getLounge(loungeId as string),
  });

  return {
    props: {
      lounge: data?.lounge,
      loading: loading,
    },
  };
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

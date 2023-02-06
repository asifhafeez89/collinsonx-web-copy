import { Lounge, PageTitle } from '@collinsonx/design-system/index';
import { client } from '@collinsonx/utils/apollo';
import getLounge from '../gql/getLounge';

import Layout from '../components/Layout';
import {
  UnstyledButton,
  Title,
  Stack,
  Box,
  SimpleGrid,
  List,
  Divider,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { LoungeData } from '@collinsonx/utils/types/lounge';

interface BookLoungeProps {
  lounge: LoungeData;
  loading: boolean;
}

export default function BookLounge(props: BookLoungeProps) {
  const router = useRouter();
  const { lounge, loading } = props;

  const handleBook = () => {
    router.push({
      pathname: '/book',
      query: { id: lounge.id },
    });
  };

  return (
    <>
      {loading && !lounge && <div>loading...</div>}
      {!loading && lounge && (
        <Stack align="stretch">
          <PageTitle title={lounge?.name} url={`/lounge`} />
          <Lounge
            image={lounge?.images?.[0]?.url}
            airport={lounge?.location}
            openingTimes={lounge?.openingHours.substring(1, 20)}
          />
          <Divider color={'gray'} />
          <Box>
            <Title size={16} color={'#000000'}>
              Facilities
            </Title>
            <SimpleGrid cols={2}>
              <List sx={{ color: '#000000' }}>
                <List.Item>Air conditioning</List.Item>
                <List.Item>Disabled access</List.Item>
              </List>
              <List sx={{ color: '#000000' }}>
                <List.Item>WiFi</List.Item>
                <List.Item>Television</List.Item>
              </List>
            </SimpleGrid>
          </Box>
          <Box>
            <Title size={16} color={'#000000'}>
              Conditions
            </Title>
            <List sx={{ color: '#000000' }}>
              <List.Item>
                Access is permitted no more than 3 hours prior to scheduled
                flight.
              </List.Item>
              <List.Item>
                Access may be restricted due to space constraints
              </List.Item>
            </List>
          </Box>
          <UnstyledButton
            onClick={handleBook}
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
            Book lounge
          </UnstyledButton>
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

BookLounge.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

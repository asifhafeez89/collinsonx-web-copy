import { Lounge, PageTitle } from '@collinsonx/design-system/index';
import { gql, client, useQuery } from '@collinsonx/utils/apollo';

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
import { LoungeData } from '@collinsonx/utils/types/lounge';
import { useEffect, useState } from 'react';

export default function BookLounge() {
  const router = useRouter();
  const loungeId = router?.query?.id ?? '';
  const LOUNGE_QUERY = gql`
  query Lounge {
    lounge(id: "${loungeId}") {
      name
      location
      openingHours
      conditions
      facilities
      id
      images {
        url
        height
        width
      }
    }
  }
`;
  const { data, loading, refetch, error } = useQuery(LOUNGE_QUERY);
  const [lounge, setLounge] = useState<LoungeData>();

  useEffect(() => {
    console.log(data);
    if (!loading && !error && data?.lounge) {
      setLounge(data.lounge);
    }
  }, [data, loading, error]);

  const { name, location, openingHours, conditions, facilities, images } =
    lounge ?? { name: 'error', location: 'error', images: [] };

  const handleBook = () => {
    router.push({
      pathname: '/book',
      query: { lounge: JSON.stringify(lounge) },
    });
  };

  return (
    <Stack align="stretch">
      <PageTitle title={name} url={'/lounge'} />
      <Lounge image={images?.[0]?.url} airport={location} />
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
            Access is permitted no more than 3 hours prior to scheduled flight.
          </List.Item>
          <List.Item>
            Access may be restricted due to space constraints
          </List.Item>
        </List>
      </Box>
      <Box>
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
          }}
        >
          Book lounge
        </UnstyledButton>
      </Box>
    </Stack>
  );
}

BookLounge.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

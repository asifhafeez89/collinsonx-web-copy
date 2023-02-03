import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinsonx/design-system/core';

import { Button, Card } from '@collinsonx/design-system';
import { Filter } from '@collinsonx/design-system/assets/icons';

import { gql, client } from '@collinsonx/utils/apollo';

import Layout from '../components/Layout';
import { lounges, LoungeType } from '../lounges';

export default function Landing(props: unknown) {
  const router = useRouter();

  const handleClickSearch = () => {};
  const goToLoungeDetails = (lounge: LoungeType) => {
    router.push({
      pathname: '/details',
      query: { lounge: JSON.stringify(lounge) },
    });
  };

  return (
    <Stack align="stretch" sx={{ position: 'relative' }}>
      <Stack spacing={24} align="stretch">
        <Title order={1} size={20} align="center">
          Ready for your next experience?
        </Title>
        <Button
          handleClick={handleClickSearch}
          icon={<Filter />}
          variant="outline"
          fullWidth
          color="dark"
        >
          Filter
        </Button>
      </Stack>
      <Flex mt={10} align="stretch" direction="column">
        {lounges.map((lounge, i) => {
          return (
            <Card
              title={lounge.loungeName}
              subtitle={`${lounge.airport} ${lounge.terminal}`}
              pictureUrl={lounge.pictureUrl}
              handleClick={() => goToLoungeDetails(lounge)}
              key={i}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}

export async function getInitialProps() {
  const { data } = await client.query({
    query: gql`
      query Lounges {
        lounges {
          id
          name
        }
      }
    `,
  });

  return {
    props: {
      lounges: data.lounges.slice(0, 4),
    },
  };
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Button, Card } from '@collinsonx/design-system';
import { Filter } from '@collinsonx/design-system/assets/icons';
import { gql, client } from '@collinsonx/utils/apollo';

import Layout from '../components/Layout';
import { LoungeData } from '@collinsonx/utils/types/lounge';

export default function Landing({ lounges }: { lounges: LoungeData[] }) {
  const router = useRouter();

  const handleClickSearch = () => {};
  const goToLoungeDetails = (lounge: LoungeData) => {
    router.push({
      pathname: '/details',
      query: { id: lounge.id },
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
          const { name, location, id, images } = lounge;
          return (
            <Card
              title={name}
              subtitle={location}
              pictureUrl={images?.[0].url ?? ''}
              handleClick={() => goToLoungeDetails(lounge)}
              key={id}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}

Landing.getInitialProps = async () => {
  const { data } = await client.query({
    query: gql`
      query Lounges {
        lounges {
          id
          name
          location
          images {
            url
          }
        }
      }
    `,
  });

  return {
    lounges: data.lounges,
  };
};

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Button, Card } from '@collinsonx/design-system';
import { Filter } from '@collinsonx/design-system/assets/icons';
import LoungeImage from '@components/LoungeImage';
import Layout from '@components/Layout';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { client } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';

export default function Landing({ lounges }: { lounges: Experience[] }) {
  const router = useRouter();

  const handleClickSearch = () => {};
  const goToLoungeDetails = (lounge: Experience) => {
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
        >
          Filter
        </Button>
      </Stack>
      <Flex mt={10} align="stretch" direction="column">
        {lounges?.map((lounge) => {
          const { name, location, id, images } = lounge;
          return (
            <Card
              title={name || '-'}
              subtitle={location || '-'}
              ImageComponent={
                <LoungeImage width={309} height={232} images={images} />
              }
              handleClick={() => goToLoungeDetails(lounge)}
              key={id}
            />
          );
        })}
      </Flex>
    </Stack>
  );
}

export async function getServerSideProps() {
  const { data } = await client.query({
    query: getSearchExperiences,
  });

  return {
    props: {
      lounges: data.searchExperiences,
    },
  };
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

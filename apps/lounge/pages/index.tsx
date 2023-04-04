import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Card } from '@collinsonx/design-system';
import LoungeImage from '@components/LoungeImage';
import Layout from '@components/Layout';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { client } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import { useSessionContext } from '@collinsonx/utils/supertokens';

export default function Landing({ lounges }: { lounges: Experience[] }) {
  const router = useRouter();

  const session = useSessionContext();

  console.log('session ', session);

  const goToLoungeDetails = (lounge: Experience) => {
    router.push({
      pathname: '/details',
      query: { id: lounge.id },
    });
  };

  return (
    <Stack spacing={16} sx={{ position: 'relative' }}>
      <Title order={1} size={20} align="center">
        Ready for your next experience?
      </Title>
      <Flex direction="column">
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

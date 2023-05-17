import { useRouter } from 'next/router';
import {
  Title,
  Stack,
  Flex,
  Skeleton,
  Box,
} from '@collinsonx/design-system/core';
import { Card } from '@collinsonx/design-system';
import LoungeImage from '@components/LoungeImage';
import Layout from '@components/Layout';

import { Experience } from '@collinsonx/utils/generatedTypes/graphql';
import { useQuery } from '@collinsonx/utils/apollo';
import { getSearchExperiences } from '@collinsonx/utils/queries';
import CardSkeleton from '@collinsonx/design-system/components/card/CardSkeleton';
import LoungeError from '@components/LoungeError';

export default function Landing() {
  const router = useRouter();

  const goToLoungeDetails = (lounge: Experience) => {
    router.push({
      pathname: '/details',
      query: { id: lounge.id },
    });
  };

  const { loading, error, data } = useQuery<{
    searchExperiences: Experience[];
  }>(getSearchExperiences);

  return (
    <Box px={8}>
      <Stack spacing={16} sx={{ position: 'relative' }}>
        <Title order={1} size={20} align="center">
          Ready for your next experience?
        </Title>
        <Flex direction="column">
          {loading && <CardSkeleton />}
          <LoungeError error={error} />
          {data?.searchExperiences?.map((lounge) => {
            const { name, location, id, images, openingHours } = lounge;
            return (
              <Card
                title={name || '-'}
                subtitle={location || '-'}
                price={'17.50'}
                openingHours={openingHours}
                ImageComponent={
                  <LoungeImage
                    width={309}
                    height={126}
                    images={images}
                    withControls
                  />
                }
                handleClick={() => goToLoungeDetails(lounge)}
                key={id}
              />
            );
          })}
        </Flex>
      </Stack>
    </Box>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

import { useRouter } from 'next/router';
import { Title, Stack, Flex } from '@collinson/design-system/core';

import { Button, Card } from '@collinson/design-system';
import { Filter } from '@collinson/design-system/assets/icons';
import Layout from '../components/Layout';
import { lounges, LoungeType } from '../lounges';

export default function Landing() {
  const router = useRouter();

  const handleClickSearch = () => {};
  const goToLoungeDetails = (lounge: LoungeType) => {
    router.push({
      pathname: '/details',
      query: { lounge: JSON.stringify(lounge) },
    });
  };

  return (
    <>
      <Stack align="center" sx={{ position: 'relative' }}>
        <Stack spacing={24} align="center">
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
        <Flex mt={10} align="center" direction="column">
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
    </>
  );
}

Landing.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

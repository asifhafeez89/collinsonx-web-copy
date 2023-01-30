import { useRouter } from 'next/router';
import {
  Title,
  Stack,
  Flex,
} from '@mantine/core';

import { Button, Card } from '@collinson/design-system'


export default function Landing() {
  const router = useRouter();

  const lounges = [
    {
      title: 'Athens Internation airport',
      subtitle: 'Athens Greece',
      pictureUrl: 'https://picsum.photos/200/100?grayscale'
    },
    {
      title: 'Athens Internation airport',
      subtitle: 'Athens Greece',
      pictureUrl: 'https://picsum.photos/200/100?grayscale'
    },
    {
      title: 'Athens Internation airport',
      subtitle: 'Athens Greece',
      pictureUrl: 'https://picsum.photos/200/100?grayscale'
    },
    {
      title: 'Athens Internation airport',
      subtitle: 'Athens Greece',
      pictureUrl: 'https://picsum.photos/200/100?grayscale'
    },
  ]

  const handleClickSearch = () => {

  }

  return <>
    <Stack align="center" sx={{ position: 'relative', zIndex: 1000 }}>
        <Stack spacing={24} align="center">
          <Title order={1} size={20} align="center">
            Ready for your next experience?
          </Title>
          <Button handleClick={handleClickSearch} useIcon={true} variant="outline" fullWidth color="dark">
            Confirm
          </Button>
        </Stack>
        <Flex mt={10} align="center" direction="column">
          {
            lounges.map(lounge => {
              return (
                <Card {...lounge} handleClick={() => console.log()} />
              )
            })
          }
        </Flex>
      </Stack>
  </>;
}

Landing.getLayout = (page: JSX.Element) => {page};

import { Button, Title, Stack, TextInput, Box, Flex } from '@mantine/core';

import { useRouter } from 'next/router';
import LayoutLogin from '../components/LayoutLogin';
import LoginImage from '../assets/login.svg';

export default function Home() {
  const router = useRouter();
  const handleClickContinue = () => {
    router.push('/check-email');
  };
  return (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          width: '100%',
          height: '50%',
          border: '1px solid white'
        }}
      >
        <div
          style={{
            backgroundColor: '#47D4B1',
            width: '150vh',
            height: '150vh',
            position: 'absolute',
            bottom: '-100vh',
            left: '-75vh',
            borderTopRightRadius: '50%',
          }}
        />
      </div>
      <Stack spacing={50}>
        <Stack spacing={24} sx={{ height: '100%' }}>
          <Title order={1} size={20} align="center">
            Login to your account
          </Title>
          <TextInput
            placeholder="Your email address"
            label="Your email address"
            withAsterisk
          />
          <Button fullWidth onClick={handleClickContinue}>
            Continue
          </Button>
        </Stack>
        <Flex align="center" direction="column">
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
            }}
          >
            <Box sx={{ zIndex: 1, position: 'relative' }}>
              <LoginImage />
            </Box>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

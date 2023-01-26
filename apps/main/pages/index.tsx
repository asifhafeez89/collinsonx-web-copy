import { Button, Title, Stack, TextInput, Box, Flex } from '@mantine/core';

import { useRouter } from 'next/router';
import LayoutLogin from '../components/LayoutLogin';
import LoginImage from '../assets/login.svg';
import EllipseLogin from '../assets/ellipse-login.svg';

export default function Home() {
  const router = useRouter();
  const handleClickContinue = () => {
    router.push('/check-email');
  };
  return (
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
            maxWidth: '342px',
            maxHeight: '304px',
          }}
        >
          <Box sx={{ zIndex: 1, position: 'relative' }}>
            <LoginImage />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: '0',
              zIndex: 0,
              width: '379px',
              marginLeft: '-20px',
              marginBottom: '-20px',
            }}
          >
            <EllipseLogin />
          </Box>
        </Box>
      </Flex>
    </Stack>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

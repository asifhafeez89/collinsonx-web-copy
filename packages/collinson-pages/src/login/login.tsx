import { Button, Title, Stack, TextInput, Box, Flex } from '@mantine/core';
import { useRouter } from 'next/router';

import { LayoutLogin, BaseInput, Image } from '@collinson/design-system';

export default function Login() {
  const router = useRouter();
  
    const handleClickContinue = () => {
     router.push('/check-email');
    };

  return (
    <LayoutLogin>
      <Stack spacing={50}>
        <Stack spacing={24}>
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
              width: '100%',
              maxWidth: '342px',
              maxHeight: '304px',
            }}
          >
            <Image src="../assets/login.svg" alt="Login" />
          </Box>
        </Flex>
      </Stack>
    </LayoutLogin>
  );
}


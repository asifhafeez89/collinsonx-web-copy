import { Button, Title, Stack, Text, Box, Flex } from '@mantine/core';
import { useRouter } from 'next/router';

import { LayoutLogin, BaseInput, Image } from '@collinson/design-system';

const CheckEmail = ()  => {
  const router = useRouter();

  const handleClickConfirm = () => {
    router.push('/success');
  };
  const handleClickReenter = () => {
    router.push('/');
  };

  return (
    <LayoutLogin>
        <Stack align="center">
        <Stack spacing={24} align="center">
            <Title order={1} size={20}>
            Check your email
            </Title>
            <Text align="center">
            We have sent a confirmation code to john@doe.com.
            </Text>
            <Text size={14}>
            Wrong email?{' '}
            <Button
                variant="subtle"
                sx={{ fontSize: '14px', height: '20px', color: 'white' }}
                onClick={handleClickReenter}
                compact
            >
                Re-enter your address
            </Button>
            </Text>
            <BaseInput />
            <Button onClick={handleClickConfirm} fullWidth>
            Confirm
            </Button>
        </Stack>
        <Flex mt={58} align="center" direction="column">
            <Box
            sx={{
                width: '100%',
                maxWidth: '342px',
                maxHeight: '304px',
            }}
            >
             {/* <LoginCode /> */}
            </Box>
        </Flex>
        </Stack>
    </LayoutLogin>
  );
}

export default CheckEmail;

import { Button, Title, Stack, Text, Box, Flex } from '@mantine/core';
import { useRouter } from 'next/router';

import LayoutLogin from '../components/LayoutLogin';

import { AuthInput } from '@collinson/design-system';
import { LoginCode } from '@collinson/design-system/assets/graphics';

export default function CheckEmail() {
  const router = useRouter();
  const { email } = router.query;

  const handleClickConfirm = () => {
    router.push('/success');
  };

  const handleClickReenter = () => {
    router.push('/');
  };

  return (
    <>
      <Stack align="center" sx={{ position: 'relative', zIndex: 1000 }}>
        <Stack spacing={24} align="center">
          <Title order={1} size={20}>
            Check your email
          </Title>
          <Text align="center">
            We have sent a confirmation code to {email}.
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
          <AuthInput handleCodeChange={(code) => console.log(code)} />
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
            <LoginCode />
          </Box>
        </Flex>
      </Stack>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          overflow: 'hidden',
          width: '100%',
          height: '50%',
        }}
      >
        <div
          style={{
            backgroundColor: '#47D4B1',
            width: '55vh',
            height: '55vh',
            position: 'absolute',
            zIndex: '100',
            right: '-90px',
            bottom: '-60px',
            borderRadius: '50%',
          }}
        />
      </div>
    </>
  );
}

{
  /* <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          bottom: '-10px',
          zIndex: '100'
        }}
      >
         <div
          style={{
            backgroundColor: '#47D4B1',
            width: '55vh',
            height: '52vh',
            position: 'absolute',
            zIndex: '100',
            right: '-110px',
            bottom: '-30px',
            borderRadius: '50%',
          }}
        />
      </div> */
}

CheckEmail.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

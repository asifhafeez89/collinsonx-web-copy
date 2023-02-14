import {
  Button,
  Title,
  Stack,
  Text,
  Box,
  Flex,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import { consumePasswordlessCode } from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import LayoutLogin from '../components/LayoutLogin';

import { AuthInput } from '@collinsonx/design-system';
import { LoginCode } from '@collinsonx/design-system/assets/graphics';
import { useEffect, useState } from 'react';

export default function CheckEmail() {
  const router = useRouter();
  const { email } = router.query;
  const [code, setCode] = useState<string>();

  const handleClickConfirm = async () => {
    if (code?.length === 6) {
      let response = await consumePasswordlessCode({
        userInputCode: code,
      });

      if (response.status === 'OK') {
        // if (response.createdNewUser) {
        //   // user sign up success
        // } else {
        //   // user sign in success
        // }
        router.push('/success');
      } else if (response.status === 'INCORRECT_USER_INPUT_CODE_ERROR') {
        // the user entered an invalid OTP
        window.alert(
          'Wrong OTP! Please try again. Number of attempts left: ' +
            (response.maximumCodeInputAttempts -
              response.failedCodeInputAttemptCount)
        );
      } else if (response.status === 'EXPIRED_USER_INPUT_CODE_ERROR') {
        // it can come here if the entered OTP was correct, but has expired because
        // it was generated too long ago.
        window.alert(
          'Old OTP entered. Please regenerate a new one and try again'
        );
      } else {
        // this can happen if the user tried an incorrect OTP too many times.
        window.alert('Login failed. Please try again');
      }
    }
  };

  const handleClickReenter = () => {
    router.push('/');
  };

  return (
    <>
      <Stack align="center" sx={{ position: 'relative', zIndex: 2 }}>
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
          <AuthInput handleCodeChange={(code) => setCode(code)} />
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
            <LoginCode handleOnChange={(code: string) => setCode(code)} />
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
            right: '-90px',
            bottom: '-60px',
            borderRadius: '50%',
          }}
        />
      </div>
    </>
  );
}

CheckEmail.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

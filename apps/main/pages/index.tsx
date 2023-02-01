import {
  Button,
  Title,
  Stack,
  TextInput,
  TextInputProps,
  Box,
  Flex,
} from '@collinsonx/design-system/core';

import { useRouter } from 'next/router';
import { Login as LoginImage } from '@collinsonx/design-system/assets/graphics';
import { KeyboardEventHandler, useState } from 'react';
import LayoutLogin from '../components/LayoutLogin';

function validateEmail(input: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleClickContinue = () => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      router.push({ pathname: '/check-email', query: { email } });
    }
  };

  const handleChangeEmail: TextInputProps['onChange'] = (e) => {
    setLoginError('');
    setEmail(e.target.value);
  };

  const handleEnterKey: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleClickContinue();
    }
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
            autoFocus
            type="email"
            value={email}
            error={loginError}
            onChange={handleChangeEmail}
            onKeyUp={handleEnterKey}
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
            <Box sx={{ position: 'relative' }}>
              <LoginImage />
            </Box>
          </Box>
        </Flex>
      </Stack>
    </>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

import {
  Button,
  Title,
  Stack,
  TextInput,
  TextInputProps,
  Box,
  Flex,
} from '@collinsonx/design-system/core';
import { getThemeKey } from '../lib/index';

import { useRouter } from 'next/router';
import { Login as LoginX } from '@collinsonx/design-system/assets/graphics/experienceX';
import { Login as LoginDiners } from '@collinsonx/design-system/assets/graphics/dinersClub';
import { KeyboardEventHandler, useState } from 'react';
import LayoutLogin from '../components/LayoutLogin';
import { createPasswordlessCode } from '@collinsonx/utils/supertokens';

const logos = {
  experienceX: LoginX,
  dinersClub: LoginDiners,
};

const themeKey = getThemeKey();
const LoginImage = logos[themeKey as keyof typeof logos];

function validateEmail(input: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

export default function Home(props: unknown) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleClickContinue = async () => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      try {
        await createPasswordlessCode({
          email,
        });
        router.push({ pathname: '/check-email', query: { email } });
      } catch (err: any) {
        console.log(err);
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you,
          // or if the input email / phone number is not valid.
          window.alert(err.message);
        } else {
          window.alert('Oops! Something went wrong.');
        }
      }
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
      {themeKey !== 'dinersClub' && (
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
              backgroundColor: '#946A00',
              width: '150vh',
              height: '150vh',
              position: 'absolute',
              bottom: '-100vh',
              left: '-75vh',
              borderTopRightRadius: '50%',
            }}
          />
        </div>
      )}
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
          <Button
            fullWidth
            onClick={handleClickContinue}
            sx={({ colors }) => ({
              padding: 8,
              height: 44,
              borderRadius: 4,
            })}
          >
            Login
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

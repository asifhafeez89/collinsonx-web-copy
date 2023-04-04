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
import { useEffect, KeyboardEventHandler, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { client, useLazyQuery } from '@collinsonx/utils/apollo';
import getConsumerByEmailAddress from '@collinsonx/utils/queries/getConsumerByEmailAddress';

const logos = {
  experienceX: LoginX,
  dinersClub: LoginDiners,
};

const themeKey = getThemeKey();

function validateEmail(input: string) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input);
}

export default function Home(props: unknown) {
  const session = useSessionContext();
  const [userId, setUserId] = useState<string>();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loginError, setLoginError] = useState('');

  const [loadConsumer, { loading, data, error }] = useLazyQuery(
    getConsumerByEmailAddress
  );

  useEffect(() => {
    if (!session.loading) {
      const { userId } = session;
      setUserId(userId);
      if (userId) {
        router.push('/lounge');
      }
    }
  }, [session, router]);

  const handleClickContinue = async () => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      const { data, loading } = await client.query({
        query: getConsumerByEmailAddress,
        variables: { emailAddress: email },
      });

      const userId = data?.getConsumerByEmailAddress?.id;
      console.log('userId ', userId, ' ', email);

      if (userId) {
        // user is already registered
        // proceed to code verification
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
      } else {
        // user needs to sign up
        router.push('/signup-user');
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
      </Stack>
    </>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

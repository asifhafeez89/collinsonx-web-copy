import { Title, Stack, Flex, Text } from '@collinsonx/design-system/core';
import { Button } from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { Breadcramp } from '@collinsonx/design-system';
import { InputLabel } from '@collinsonx/design-system';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import usePayload from 'hooks/payload';

interface FormValues {
  email: string;
}

export default function Home(props: unknown) {
  const session = useSessionContext();

  const [loading, setLoading] = useState(true);
  const { token } = usePayload();

  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const ref = useRef(false);

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
    },
  });

  useEffect(() => {
    if (session && !session.loading) {
      const { userId } = session;
      if (userId) {
        // if (!ref.current) {
        router.push({ pathname: '/booking', query: { in: token } });
        ref.current = true;
        // }
      } else {
        setLoading(false);
      }
    }
  }, [session, router, token]);

  const handleClickContinue = async ({ email }: FormValues) => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      try {
        await createPasswordlessCode({
          email,
        });
        router.push({
          pathname: '/auth/check-code',
          query: { email, redirectUrl: router.query?.redirectUrl, in: token },
        });
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

  // this will be covered by https://lifestyle-x.atlassian.net/browse/BAAS-95
  const loungeTitle = "Gatwick Airport".toUpperCase();

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          <Stack sx={{ width: '100%' }}>
            <Breadcramp title={loungeTitle} url="#" />
          </Stack>
          <form onSubmit={form.onSubmit(handleClickContinue)}>
              <Stack
                spacing={24}
                sx={{
                  height: '100%',
                  width: '440px',
                  margin: '0 auto',
                  '@media (max-width: 40em)': {
                    width: '100%',
                    padding: '16px 24px 0 24px',
                  },
                }}
              >
                <Title
                  order={1}
                  size={20}
                  sx={{
                    textAlign: 'center',
                    '@media (max-width: 40em)': {
                      textAlign: 'left',
                    },
                  }}
                >
                  Enter your email address
                </Title>
                <Stack spacing={10}>
                  <InputLabel
                    type="text"
                    autoFocus
                    placeholder="stark@gmail.com"
                    label="Email address"
                    withAsterisk
                    {...form.getInputProps('email')}
                    data-testid="loginEmailAddress"
                  />
                  <Text align="left">
                    We will send you a unique code via email to proceed
                  </Text>
                </Stack>
                <Button type="submit" data-testid="login">
                  Continue
                </Button>
              </Stack>
          </form>
        </LayoutLogin>
      )}
    </>
  );
}

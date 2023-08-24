import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Button } from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { InputLabel } from '@collinsonx/design-system';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';

interface FormValues {
  email: string;
}

export default function Home(props: unknown) {
  const session = useSessionContext();

  const [loading, setLoading] = useState(true);

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
    console.log(session);
    if (session && !session.loading) {
      const { userId } = session;

      if (userId) {
        if (!ref.current) {
          router.push('/booking');
          ref.current = true;
        }
      } else {
        setLoading(false);
      }
    }
  }, [session, router]);

  const handleClickContinue = async ({ email }: FormValues) => {
    if (!validateEmail(email.trim())) {
      setLoginError('Invalid email');
    } else {
      try {
        await createPasswordlessCode({
          email,
        });
        router.push({
          pathname: '/checkemail',
          query: { email, redirectUrl: router.query?.redirectUrl },
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

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          <form onSubmit={form.onSubmit(handleClickContinue)}>
            <Stack spacing={50}>
              <Stack spacing={24} sx={{ height: '100%' }}>
                <Title order={1} size={20} align="center">
                  Login to your account
                </Title>
                <InputLabel
                  type="text"
                  autoFocus
                  placeholder="Your email address"
                  label="Your email address"
                  isWhite={true}
                  styles={{
                    root: {
                      display: 'flex',
                      flexDirection: 'column',
                    },
                    description: {
                      order: 1,
                      marginTop: '4px',
                      marginBottom: '0',
                    },
                    label: {
                      order: -2,
                    },
                    input: {
                      order: -1,
                    },
                    error: {
                      order: 2,
                    },
                  }}
                  withAsterisk
                  {...form.getInputProps('email')}
                  data-testid="loginEmailAddress"
                />

                <Button type="submit" data-testid="login">
                  Login
                </Button>
              </Stack>
            </Stack>
          </form>
        </LayoutLogin>
      )}
    </>
  );
}

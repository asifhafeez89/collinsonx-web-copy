import { Title, Stack, Flex } from '@collinsonx/design-system/core';
import { Button } from '@collinsonx/design-system/core';
import { getThemeKey } from '../lib/index';
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

const themeKey = getThemeKey();

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
    if (session && !session.loading) {
      const { userId } = session;
      if (userId) {
        if (!ref.current) {
          router.push('/lounge');
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
          pathname: '/check-email',
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

  console.log(
    'NEXT_PUBLIC_SITE_DOMAIN_URL ',
    process.env.NEXT_PUBLIC_SITE_DOMAIN_URL
  );
  console.log('SITE_DOMAIN_URL ', process.env.SITE_DOMAIN_URL);
  console.log(
    'NEXT_PUBLIC_SESSION_SCOPE ',
    process.env.NEXT_PUBLIC_SESSION_SCOPE
  );

  return (
    <>
      {loading ? (
        <Flex justify="center" align="center" h="100%">
          <LoaderLifestyleX />
        </Flex>
      ) : (
        <LayoutLogin>
          <form onSubmit={form.onSubmit(handleClickContinue)}>
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
                    backgroundColor: '#182E45',
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
                <InputLabel
                  type="email"
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
                />

                <Button type="submit">Login</Button>
              </Stack>
            </Stack>
          </form>
        </LayoutLogin>
      )}
    </>
  );
}

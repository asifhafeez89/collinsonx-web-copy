import { Title, Stack } from '@collinsonx/design-system/core';
import { Button } from '@mantine/core';
import { getThemeKey } from '../lib/index';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import { Login as LoginX } from '@collinsonx/design-system/assets/graphics/experienceX';
import { Login as LoginDiners } from '@collinsonx/design-system/assets/graphics/dinersClub';
import { useEffect, useState } from 'react';
import LayoutLogin from '@components/LayoutLogin';
import {
  createPasswordlessCode,
  useSessionContext,
} from '@collinsonx/utils/supertokens';
import { InputLabel } from '@collinsonx/design-system';
import validateEmail from '@collinsonx/utils/lib/validateEmail';

const logos = {
  experienceX: LoginX,
  dinersClub: LoginDiners,
};

const themeKey = getThemeKey();

interface FormValues {
  email: string;
}

export default function Home(props: unknown) {
  const session = useSessionContext();
  const [userId, setUserId] = useState<string>();

  const router = useRouter();
  const [loginError, setLoginError] = useState('');

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
    if (!session.loading) {
      const { userId } = session;
      setUserId(userId);
      if (userId) {
        router.push('/lounge');
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

  return (
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
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

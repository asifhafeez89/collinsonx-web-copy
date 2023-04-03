import {
  Title,
  Stack,
  TextInput,
  TextInputProps,
  Box,
  Flex,
} from '@collinsonx/design-system/core';
import { Button } from '@mantine/core';
import { getThemeKey } from '../lib/index';
import { useForm } from '@mantine/form';
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

interface formValues {
  email: string;
}

export default function Home(props: unknown) {
  const router = useRouter();
  const [loginError, setLoginError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleClickContinue = async ({ email }: formValues) => {
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
            placeholder="Your email address"
            label="Your email address"
            description="the email you want to receive the email"
            withAsterisk
            {...form.getInputProps('email')}
          />
          <Button type="submit">Submit</Button>
        </Stack>
      </Stack>
    </form>
  );
}

Home.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

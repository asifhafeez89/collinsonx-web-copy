import {
  Title,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
  Anchor,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';

export interface FormValues {
  email: string;
  password: string;
}

// EmailPassword recipe / Custom UI / Signin form
// https://supertokens.com/docs/emailpassword/custom-ui/email-password-login#sign-in-form

export default function Login() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
      password: (value: string) =>
        value.trim() === '' ? 'Password is required' : null,
    },
  });
  const handleLogin = async ({ email, password }: FormValues) => {
    if (!validateEmail(email.trim())) {
    } else {
      try {
        // ...
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <PageTitle title="Login" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Login
          </Title>
        </Stack>
        <FormContainer>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput label="Email" {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              mt={32}
              {...form.getInputProps('password')}
            />
            <Checkbox label="Save my password" mt={16} />
            <Button type="submit" mt={40} fullWidth>
              Login
            </Button>
            <Anchor
              component={Link}
              href="/auth/reset-password"
              sx={{ marginTop: 24, display: 'block' }}
            >
              Forgotten password?
            </Anchor>
            <Anchor
              component={Link}
              href="/auth/forgot-email"
              sx={{ marginTop: 16, display: 'block' }}
            >
              Forgotten email?
            </Anchor>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Login.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

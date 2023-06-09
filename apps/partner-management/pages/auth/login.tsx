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
import { signIn } from 'supertokens-auth-react/recipe/emailpassword';

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

  async function handleLogin({ email, password }: FormValues) {
    if (!validateEmail(email.trim())) {
    } else {
      try {
        let response = await signIn({
          formFields: [
            {
              id: 'email',
              value: email,
            },
            {
              id: 'password',
              value: password,
            },
          ],
        });

        console.log(email, password);

        if (response.status === 'FIELD_ERROR') {
          response.formFields.forEach((formField) => {
            if (formField.id === 'email') {
              // Email validation failed (for example incorrect email syntax).
              window.alert(formField.error);
            }
          });
        } else if (response.status === 'WRONG_CREDENTIALS_ERROR') {
          window.alert('Email password combination is incorrect.');
        } else {
          // sign in successful. The session tokens are automatically handled by
          // the frontend SDK.
          window.location.href = '/homepage';
        }
      } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you.
          window.alert(err.message);
        } else {
          console.log('err ', err);
          window.alert('Oops! Something went wrong.');
        }
      }
    }
  }

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
              href="/auth/reset-request"
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

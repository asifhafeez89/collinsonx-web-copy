import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
  Box,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import PageTitle from '@components/PageTitle';
import jwtDecode from 'jwt-decode';

export interface FormValues {
  email: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
}

// EmailPassword recipe / Custom UI / Signup form
// https://supertokens.com/docs/emailpassword/custom-ui/email-password-login#sign-up-form
// https://supertokens.com/docs/emailpassword/custom-ui/email-password-login#checking-if-email-is-unique

/*
 * - An invitation ID should be supplied in the query
 * - We should have a way to fetch details for the specific invite ID: lounge title, airport, terminal
 * - Upon invite lookup:
 *    - if successful, redirect to /signup/confirm on submission
 *    - if invite has expired redirect to /signup/expired
 */

// Note: backend must know the URL for this page

const MOCK_AIRPORT = 'London Heathrow';
const MOCK_TERMINAL = 'Terminal 5';

const MOCK_JWT =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHBlcmllbmNlSUQiOiIxMzM3IiwibG91bmdlTmFtZSI6IkNsdWIgQXNwaXJlIExvdW5nZSIsInBhcnRuZXJJRCI6ImZvb2JhciIsInBhcnRuZXJOYW1lIjoiRm9vIEJhciJ9.B7M3A367PUGBmUS5EV3zk8ZW5o6A6QoMSeLSWDRoCm8';

export default function Signup() {
  const form = useForm({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (value: string) =>
        !validateEmail(value) ? 'Please enter a valid email address.' : null,
      password: (value: string) =>
        value.trim() === '' ? 'Password is required' : null,
      passwordConfirm: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const handleSignup = async ({ email, fullName, password }: FormValues) => {
    if (!validateEmail(email.trim())) {
    } else {
      try {
        // ...
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const invitationData = jwtDecode<Record<string, string>>(MOCK_JWT);

  return (
    <>
      <PageTitle title="Signup" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Text size={22} fw={600} color="cyan.8">
            Welcome to
          </Text>
          <Box>
            <Text align="center" size={32} fw={700}>
              {invitationData.loungeName}
            </Text>
            <Text size={32} align="center">
              {MOCK_AIRPORT} - {MOCK_TERMINAL}
            </Text>
          </Box>
        </Stack>
        <FormContainer>
          <Text align="center" size={18} fw={600}>
            Create an account
          </Text>
          <form onSubmit={form.onSubmit(handleSignup)}>
            <TextInput label="Email" mt={40} {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              mt={32}
              {...form.getInputProps('password')}
            />
            <PasswordInput
              mt={16}
              label="Confirm password"
              {...form.getInputProps('passwordConfirm')}
            />
            <Button mt={40} type="submit" fullWidth>
              Submit
            </Button>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Signup.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

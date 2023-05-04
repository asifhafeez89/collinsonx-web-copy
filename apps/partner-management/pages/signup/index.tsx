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

const MOCK_LOUNGE = 'Club Aspire Lounge';
const MOCK_AIRPORT = 'London Heathrow';
const MOCK_TERMINAL = 'Terminal 5';

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
        validateEmail(value) ? null : 'Please enter a valid email address.',
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
              {MOCK_LOUNGE}
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

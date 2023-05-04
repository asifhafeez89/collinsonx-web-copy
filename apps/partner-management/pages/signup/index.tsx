import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
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
 * - We should have a way to fetch details for the specific invite ID (lounge title is displayed at the top)
 * - Upon invite lookup:
 *    - if successful, redirect to /signup/confirm on submission
 *    - if invite has expired redirect to /signup/expired
 */

const MOCK_LOUNGE = 'Club Aspire Lounge';

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
          <Title>Welcome to {MOCK_LOUNGE}</Title>
          <Text size={18}>Please create your account</Text>
        </Stack>
        <FormContainer>
          <form onSubmit={form.onSubmit(handleSignup)}>
            <TextInput label="Email" mt={32} {...form.getInputProps('email')} />
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

import {
  Title,
  Stack,
  Button,
  PasswordInput,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import PageTitle from '@components/PageTitle';

export interface FormValues {
  password: string;
  passwordConfirm: string;
}

// Email password recipe / Custom UI / Forgot password flow / Step 2
// https://supertokens.com/docs/emailpassword/custom-ui/forgot-password#step-2-updating-the-users-password

// Step 1 of the flow: apps\partner-management\pages\password-reset.tsx

export default function UpdatePassword() {
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
  const handleSubmit = async ({ password, passwordConfirm }: FormValues) => {};

  return (
    <>
      <PageTitle title="Create new password" />
      <Stack justify="center" align="center" spacing={32}>
        <Title color="cyan.8" size={22}>
          Create new password
        </Title>
        <FormContainer>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <PasswordInput
              label="New password"
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

UpdatePassword.getLayout = (page: JSX.Element) => (
  <LayoutLogin>{page}</LayoutLogin>
);

import {
  Text,
  Stack,
  Button,
  PasswordInput,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import PageTitle from '@components/PageTitle';

import { submitNewPassword } from 'supertokens-web-js/recipe/emailpassword';

export interface FormValues {
  password: string;
  passwordConfirm: string;
}

// Email password recipe / Custom UI / Forgot password flow / Step 2
// https://supertokens.com/docs/emailpassword/custom-ui/forgot-password#step-2-updating-the-users-password

// For step 1 of the flow, see apps\partner-management\pages\reset-request.tsx

export default function ResetPassword() {
  const form = useForm({
    initialValues: {
      password: '',
      passwordConfirm: '',
    },
    validate: {
      password: (value: string) =>
        value.trim() === '' ? 'Password is required' : null,
      passwordConfirm: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });

  const handleSubmit = async ({ password, passwordConfirm }: FormValues) => {
    // validation success
    try {
      let response = await submitNewPassword({
        formFields: [
          {
            id: 'password',
            value: password,
          },
        ],
      });

      if (response.status === 'FIELD_ERROR') {
        response.formFields.forEach((formField) => {
          if (formField.id === 'password') {
            // New password did not meet password criteria on the backend.
            window.alert(formField.error);
          }
        });
      } else if (response.status === 'RESET_PASSWORD_INVALID_TOKEN_ERROR') {
        // the password reset token in the URL is invalid, expired, or already consumed
        window.alert('Password reset failed. Please try again');
        window.location.assign('/auth'); // back to the login scree.
      } else {
        window.alert('Password reset successful!');
        window.location.assign('/auth');
      }
    } catch (err: any) {
      if (err.isSuperTokensGeneralError === true) {
        // this may be a custom error message sent from the API by you.
        window.alert(err.message);
      } else {
        window.alert('Oops! Something went wrong.');
      }
    }
  };

  return (
    <>
      <PageTitle title="Create new password" />
      <Stack justify="center" align="center" spacing={32}>
        <FormContainer>
          <Text align="center" size={18} fw={600} mb={40}>
            Create new password
          </Text>
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

ResetPassword.getLayout = (page: JSX.Element) => (
  <LayoutLogin>{page}</LayoutLogin>
);

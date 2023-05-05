import {
  Title,
  Text,
  Stack,
  Button,
  Anchor,
  Flex,
  TextInput,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import { useForm } from '@collinsonx/design-system/form';

import validateEmail from '@collinsonx/utils/lib/validateEmail';
import { useState } from 'react';
import { useRouter } from 'next/router';

export interface FormValues {
  email: string;
}

// EmailPassword recipe / Custom UI / Forgot password flow / Step 1
// https://supertokens.com/docs/emailpassword/custom-ui/forgot-password#step-1-sending-the-password-reset-email

// For step 2 of the flow, see apps\partner-management\pages\update-password.tsx

export default function PasswordReset() {
  const [success, setSuccess] = useState(false); // demo
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
    },
  });
  const handleSubmit = async ({ email }: FormValues) => {
    if (!validateEmail(email.trim())) {
    } else {
      setSuccess(true); // demo;
      try {
        // ...
      } catch (err: any) {
        console.log(err);
      }
    }
  };
  return (
    <>
      <PageTitle title="Reset your password" />
      <Stack justify="center" align="center" spacing={32}>
        <Title color="cyan.8" size={22}>
          Forgotten your password?
        </Title>
        {!success ? (
          <FormContainer>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack spacing={40}>
                <Text>
                  Enter the email address you use to login and we&apos;ll send
                  you a link to reset your password.
                </Text>
                <TextInput label="Email" {...form.getInputProps('email')} />
                <Button type="submit">Next</Button>
                <Text sx={{ fontSize: 16 }}>
                  If you’ve forgotten your email please contact support at
                  help@collinson.co.uk or call 01234 345498 for help with
                  getting access to your account.
                </Text>
              </Stack>
            </form>
          </FormContainer>
        ) : (
          <FormContainer>
            <Stack spacing={32}>
              <Text>
                We&apos;ve sent you an email with a link to reset your password.
                Please check your inbox and junk folders.
              </Text>
            </Stack>
            <Button
              fullWidth
              my={40}
              onClick={() => router.push('/auth/login')}
            >
              Go to login
            </Button>
            <Flex justify="center">
              <Anchor>Resend email</Anchor>
            </Flex>
          </FormContainer>
        )}
      </Stack>
    </>
  );
}

PasswordReset.getLayout = (page: JSX.Element) => (
  <LayoutLogin>{page}</LayoutLogin>
);

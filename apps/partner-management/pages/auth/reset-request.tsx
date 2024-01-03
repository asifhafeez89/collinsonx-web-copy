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

import { sendPasswordResetEmail } from 'supertokens-auth-react/recipe/emailpassword';
import Link from 'next/link';

import classes from './auth.module.css';

export interface FormValues {
  email: string;
}

// EmailPassword recipe / Custom UI / Forgot password flow / Step 1
// https://supertokens.com/docs/emailpassword/custom-ui/forgot-password#step-1-sending-the-password-reset-email

// For step 2 of the flow, see apps\partner-management\pages\auth\reset-password.tsx

export default function ResetRequest() {
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
        let response = await sendPasswordResetEmail({
          formFields: [
            {
              id: 'email',
              value: email,
            },
          ],
        });

        if (response.status === 'FIELD_ERROR') {
          // one of the input formFields failed validaiton
          response.formFields.forEach((formField) => {
            if (formField.id === 'email') {
              // Email validation failed (for example incorrect email syntax).
              window.alert(formField.error);
            }
          });
        } else {
          // reset password email sent.
          window.alert('Please check your email for the password reset link');
        }
        // ...
      } catch (err: any) {
        if (err.isSuperTokensGeneralError === true) {
          // this may be a custom error message sent from the API by you.
          window.alert(err.message);
        } else {
          window.alert('Oops! Something went wrong.');
        }
      }
    }
  };
  return (
    <>
      <PageTitle title="Reset your password" />
      <Stack justify="center" align="center" gap={32}>
        <Title className={classes.logintTitle}>Forgotten your password?</Title>
        {!success ? (
          <FormContainer>
            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap={40}>
                <Text className={classes.descriptionText}>
                  Enter the email address you use to login and we&apos;ll send
                  you a link to reset your password.
                </Text>
                <TextInput label="Email" {...form.getInputProps('email')} />
                <Button type="submit">Next</Button>
                <Text className={classes.descriptionText}>
                  If you have forgotten your email, please contact our support
                  team using the chat on the partner portal or email{' '}
                  <Anchor
                    fw={400}
                    style={{ fontSize: '18px', textDecoration: 'none' }}
                    href="mailto:partner-cergea@collinsongroup.com"
                    component={Link}
                  >
                    partner-cergea@collinsongroup.com
                  </Anchor>{' '}
                  for help in accessing your account.
                </Text>
              </Stack>
            </form>
          </FormContainer>
        ) : (
          <FormContainer>
            <Stack gap={32}>
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

ResetRequest.getLayout = (page: JSX.Element) => (
  <LayoutLogin>{page}</LayoutLogin>
);

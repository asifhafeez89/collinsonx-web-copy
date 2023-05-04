import {
  Title,
  Text,
  Stack,
  Button,
  Anchor,
  Flex,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';

export interface FormValues {
  email: string;
  password: string;
}

export default function PasswordReset() {
  return (
    <>
      <PageTitle title="Password reset" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Password reset
          </Title>
        </Stack>
        <FormContainer>
          <Stack spacing={32}>
            <Text>
              We&apos;ve sent you an email with a link to reset your password.
              Please check your inbox and junk folders.
            </Text>
          </Stack>
          <Button fullWidth my={40}>
            Go to login
          </Button>
          <Flex justify="center">
            <Anchor>Resend email</Anchor>
          </Flex>
        </FormContainer>
      </Stack>
    </>
  );
}

PasswordReset.getLayout = (page: JSX.Element) => (
  <LayoutLogin>{page}</LayoutLogin>
);

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

export default function Confirm() {
  return (
    <>
      <PageTitle title="Confirm your email" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Confirm your email address to get started
          </Title>
        </Stack>
        <FormContainer>
          <Stack spacing={32}>
            <Text>
              We&apos;ve sent you an email with a link to reset your password.
              Please check your inbox and junk folders.
            </Text>
          </Stack>
          <Button fullWidth mt={40}>
            Go to login
          </Button>
        </FormContainer>
      </Stack>
    </>
  );
}

Confirm.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

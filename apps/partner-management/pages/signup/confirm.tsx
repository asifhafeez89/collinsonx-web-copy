import { Title, Text, Stack, Button } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import { useRouter } from 'next/router';

export interface FormValues {
  email: string;
  password: string;
}

export default function Confirm() {
  const router = useRouter();
  const { email } = router.query;
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
            <Text align="center">
              We have sent you an email to <strong>{email}</strong>
            </Text>
            <Text align="center">
              Check your inbox or spam folders to confirm your email address.
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

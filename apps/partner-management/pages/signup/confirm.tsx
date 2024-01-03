import { Title, Text, Stack, Button } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import { useRouter } from 'next/router';
import classes from './signup.module.css';

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
      <Stack justify="center" align="center" gap={32}>
        <Stack justify="center" align="center" gap={8}>
          <Title className={classes.title}>
            Confirm your email address to get started
          </Title>
        </Stack>

        <FormContainer>
          <Stack gap={32}>
            <Text className={classes.center} size="lg">
              We have sent you an email to <strong>{email}</strong>
            </Text>
            <Text className={classes.center} size="lg">
              Check your inbox or spam folders to confirm your email address.
            </Text>
          </Stack>

          <Button fullWidth mt={40} onClick={() => router.push('/auth/login')}>
            Go to login
          </Button>
        </FormContainer>
      </Stack>
    </>
  );
}

Confirm.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

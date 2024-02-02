import { Title, Text, Stack, Anchor } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';
import classes from './auth.module.css';

export default function Expired() {
  return (
    <>
      <PageTitle title="Forgotten your email?" customFormat />
      <Stack justify="center" align="center" gap={32}>
        <Stack justify="center" align="center" gap={8}>
          <Title className={classes.forgotEmail}>Forgotten your email?</Title>
        </Stack>
        <FormContainer>
          <Stack gap={32}>
            <Text size="lg">
              If you have forgotten your email, please contact our support team
              using the chat on the partner portal or email{' '}
              <Anchor
                component={Link}
                fw={400}
                href="mailto:partner-cergea@collinsongroup.com"
              >
                partner-cergea@collinsongroup.com
              </Anchor>{' '}
              for help in accessing your account.
            </Text>
          </Stack>
          <Anchor
            component={Link}
            href="/auth/login"
            className={classes.returnToLogin}
          >
            Return to login
          </Anchor>
        </FormContainer>
      </Stack>
    </>
  );
}

Expired.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

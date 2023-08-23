import { Title, Text, Stack, Anchor } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';

export default function Expired() {
  return (
    <>
      <PageTitle title="Forgotten your email?" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Forgotten your email?
          </Title>
        </Stack>
        <FormContainer>
          <Stack spacing={32}>
            <Text size={18}>
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
            sx={{ marginTop: 40, display: 'block' }}
          >
            Return to login
          </Anchor>
        </FormContainer>
      </Stack>
    </>
  );
}

Expired.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

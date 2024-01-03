import {
  Title,
  Text,
  Stack,
  Button,
  Anchor,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';
import Link from 'next/link';

import classes from './signup.module.css';

export interface FormValues {
  email: string;
  password: string;
}

export default function Invalid() {
  return (
    <>
      <PageTitle title="Your link invalid" />
      <Stack justify="center" align="center" gap={32}>
        <Stack justify="center" align="center" gap={8}>
          <Title className={classes.title}>Your link is invalid</Title>
        </Stack>
        <FormContainer>
          <Stack gap={32}>
            <Text className={classes.center} size="lg">
              To protect your account, you will need to request a new link.
            </Text>
            <Text className={classes.center} size="lg">
              Any issues, please contact support at{' '}
              <Anchor
                component={Link}
                href="mailto:partner-cergea@collinsongroup.com"
                className={classes.anchor}
              >
                partner-cergea@collinsongroup.com
              </Anchor>
            </Text>
          </Stack>
          <Button fullWidth mt={40}>
            Request a new link
          </Button>
        </FormContainer>
      </Stack>
    </>
  );
}

Invalid.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

import { Title, Text, Stack, Button } from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import PageTitle from '@components/PageTitle';

export interface FormValues {
  email: string;
  password: string;
}

export default function Invalid() {
  return (
    <>
      <PageTitle title="Your link invalid" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Your link is invalid
          </Title>
        </Stack>
        <FormContainer>
          <Stack spacing={32}>
            <Text align="center" size={18}>
              To protect your account, you will need to request a new link.
            </Text>
            <Text align="center" size={18}>
              Any issues, please contact support at help@collinson.co.uk
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

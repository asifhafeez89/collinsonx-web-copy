import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
  Anchor,
  Flex,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import PageTitle from '@components/PageTitle';

export interface FormValues {
  email: string;
  password: string;
}

export default function Expired() {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
    },
  });
  const handleExpired = async ({ email, password }: FormValues) => {
    if (!validateEmail(email.trim())) {
    } else {
      try {
        // ...
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <PageTitle title="Your link has expired" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Your link has expired
          </Title>
        </Stack>
        <FormContainer>
          <Stack spacing={32}>
            <Text align="center">
              To protect your account, you will need to request a new link.
            </Text>
            <Text align="center">
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

Expired.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

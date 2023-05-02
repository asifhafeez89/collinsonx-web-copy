import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
} from '@collinsonx/design-system/core';
import styled from '@collinsonx/design-system/styled';
import LayoutLogin from '@components/LayoutLogin';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';

const FormContainer = styled('div')`
  padding: 40px;
  background: #fff;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  min-width: 448px;
`;

export interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
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
  const handleLogin = async ({ email, password }: FormValues) => {
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
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title>Login</Title>
          <Text size={18}>Club Aspire Lounge</Text>
        </Stack>
        <FormContainer>
          <form onSubmit={form.onSubmit(handleLogin)}>
            <TextInput label="Email" {...form.getInputProps('email')} />
            <PasswordInput
              label="Password"
              mt={32}
              {...form.getInputProps('password')}
            />
            <Checkbox label="Save my password" mt={16} />
            <Button type="submit" mt={40} fullWidth>
              Login
            </Button>
            <Button variant="white" px={0} sx={{ border: 0 }} mt={24}>
              Forgotten password?
            </Button>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Login.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

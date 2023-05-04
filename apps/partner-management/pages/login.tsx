import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
  Anchor,
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
      <PageTitle title="Login" />
      <Stack justify="center" align="center" spacing={32}>
        <Stack justify="center" align="center" spacing={8}>
          <Title color="cyan.8" size={22}>
            Login
          </Title>
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
            <Anchor href="#" sx={{ marginTop: 24, display: 'block' }}>
              Forgotten password?
            </Anchor>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Login.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

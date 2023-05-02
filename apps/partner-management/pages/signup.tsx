import {
  Title,
  Text,
  Stack,
  Checkbox,
  Button,
  PasswordInput,
  TextInput,
} from '@collinsonx/design-system/core';
import LayoutLogin from '@components/LayoutLogin';
import FormContainer from '@components/FormContainer';
import { useForm } from '@collinsonx/design-system/form';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import { useDisclosure } from '@collinsonx/design-system/hooks';

export interface FormValues {
  email: string;
  fullName: string;
  password: string;
  passwordConfirm: string;
}

const MOCK_LOUNGE = 'Club Aspire Lounge';

export default function Signup() {
  const [visible, { toggle }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
    },
  });
  const handleSignup = async ({ email, fullName, password }: FormValues) => {
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
          <Title>Welcome to {MOCK_LOUNGE}</Title>
          <Text size={18}>Please create your account</Text>
        </Stack>
        <FormContainer>
          <form onSubmit={form.onSubmit(handleSignup)}>
            <TextInput label="Full name" {...form.getInputProps('fullName')} />
            <TextInput label="Email" mt={32} {...form.getInputProps('email')} />
            <PasswordInput
              label="Create a password"
              mt={32}
              {...form.getInputProps('password')}
              styles={{
                rightSection: { display: 'none' },
                input: { paddingRight: 14 },
              }}
              visible={visible}
            />
            <PasswordInput
              mt={16}
              label="Confirm password"
              visible={visible}
              {...form.getInputProps('passwordConfirm')}
              styles={{
                rightSection: { display: 'none' },
                input: { paddingRight: 14 },
              }}
            />
            <Checkbox mt={16} label="Show password" onClick={toggle} />
            <Button mt={40} type="submit" fullWidth>
              Register now
            </Button>
          </form>
        </FormContainer>
      </Stack>
    </>
  );
}

Signup.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

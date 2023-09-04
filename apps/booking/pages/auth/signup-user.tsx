import {
  Button,
  Stack,
  Text,
  Flex,
  Notification,
  Checkbox,
  Title,
} from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import LayoutLogin from '../../components/LayoutLogin';
import {
  Breadcramp,
  InputLabel,
} from '@collinsonx/design-system';
import { useState } from 'react';
import updateConsumer from '@collinsonx/utils/mutations/updateConsumer';
import { useMutation } from '@collinsonx/utils/apollo';
import { ConsumerInput } from '@collinsonx/utils';
import { useRouter } from 'next/router';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';
import Error from '@components/Error';
import usePayload from 'hooks/payload';
import colors from 'ui/colour-constants';

export default function SignupUser() {
  const { token } = usePayload();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { email } = router.query;

  const form = useForm({
    initialValues: {
      email: email as string,
      firstname: undefined,
      lastname: undefined,
      marketingConsent: false,
      dateOfBirth: new Date('1990-01-01'),
    },
    validate: {
      email: (value: string) =>
        validateEmail(value) ? null : 'Please enter a valid email address.',
      firstname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your name.',
      lastname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const [updateConsumerCall, { loading: loadingUpdateConsumer, error, data }] =
    useMutation(updateConsumer);

  return loading || loadingUpdateConsumer ? (
    <Flex justify="center" align="center" h="100%">
      <LoaderLifestyleX />
    </Flex>
  ) : (
    <LayoutLogin>
      {!!error && (
        <Notification color="red.7" title="An error occurred" w="100%">
          {error.graphQLErrors.map((error, index) => (
            <Text key={index}>{error.message}</Text>
          ))}
        </Notification>
      )}
      <Breadcramp title="Back to Gatwick" url="https://bbc.co.uk" />
      <form
        onSubmit={form.onSubmit((values: any) => {
          const consumerInput: ConsumerInput = {
            dateOfBirth: values.dateOfBirth,
            firstName: values.firstname,
            lastName: values.lastname,
            marketingConsent: values.marketingConsent,
            emailAddress: values.email,
          };
          setLoading(true);
          updateConsumerCall({
            variables: { consumerInput },
            onCompleted: (data) => {
              if (data?.updateConsumer?.id) {
                router.push({ pathname: '/lounge', query: { in: token } });
              }
            },
            onError: () => {
              setLoading(false);
            },
          });
        })}
      >
        <Stack spacing={50}>
          <Stack
            spacing={24}
            sx={{
              height: '100%',
              width: '440px',
              margin: '0 auto',
              '@media (max-width: 40em)': {
                padding: '16px 24px 0 24px',
                width: '100%',
              },
            }}
          >
            <Text size={18} align='center'>
              Your session has expired, please confirm your details
            </Text>
            <Title order={1} size={24} align="center">
              Update details
            </Title>
            <Error error={error} />
            <Stack spacing={0}>
              <Text><Text span color={colors.red}>*</Text> First name(s)</Text>
              <InputLabel
                autoFocus
                type="text"
                withAsterisk
                {...form.getInputProps('firstname')}
                placeholder="First name"
                data-testid="firstName"
              />
            </Stack>
            <Stack spacing={0}>
              <Text><Text span color={colors.red}>*</Text> Last name</Text>
              <InputLabel
                type="text"
                withAsterisk
                {...form.getInputProps('lastname')}
                placeholder="Last name"
                data-testid="lastName"
              />
            </Stack>
            <InputLabel
              disabled
              readOnly
              {...form.getInputProps('email')}
              value={email}
              label="Email address"
            />
            <Checkbox
              label="I agree to receive personalised marketing emails."
              {...form.getInputProps('marketingConsent', {
                type: 'checkbox',
              })}
              styles={{
                input: {
                  borderWidth: 2,
                },
              }}
              data-testid="marketingCheckbox"
            />
            <Button fullWidth type="submit" data-testid="loginAfterSignUp">
              Login
            </Button>
          </Stack>
        </Stack>
      </form>
    </LayoutLogin>
  );
}

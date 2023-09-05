import {
  Button,
  Stack,
  Text,
  Flex,
  Group,
  Notification,
  Checkbox,
  Title,
} from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import LayoutLogin from '../../components/LayoutLogin';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import {
  Breadcramp,
  DatePicker,
  InputLabel,
  PageTitle,
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

export default function SignupUser() {
  const { token, payload, loungeCode } = usePayload();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const DATE_FORMAT = 'DD/MM/YYYY';

  const form = useForm({
    initialValues: {
      email: (payload ? payload.email : '') as string,
      firstname: (payload ? payload.firstName : '') as string,
      lastname: (payload ? payload.lastName : '') as string,
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
      <Stack sx={{ width: '100%' }}>
        <Breadcramp title="Back to Gatwick" url="https://bbc.co.uk" />
      </Stack>
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
                router.push({
                  pathname: '/',
                  query: { in: token, lc: loungeCode },
                });
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
                width: '100%',
              },
            }}
          >
            <Title order={1} size={20} align="center">
              Register
            </Title>
            <Error error={error} />
            <InputLabel
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('firstname')}
              placeholder="First name"
              label="First name(s)"
              isWhite={false}
              data-testid="firstName"
            />

            <InputLabel
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('lastname')}
              placeholder="Last name"
              label="Last name"
              isWhite={false}
              data-testid="lastName"
            />
            <InputLabel
              readOnly
              autoFocus
              type="email"
              withAsterisk
              {...form.getInputProps('email')}
              placeholder="Your email address"
              label="Your email address"
              isWhite={false}
            />
            <Text>
              We will send you a unique code via email to complete the login.
            </Text>
            <Group>
              <Flex mih={50} align="flex-start" direction="row" wrap="wrap">
                <Checkbox
                  label="I agree to receive personalised marketing emails."
                  {...form.getInputProps('marketingConsent', {
                    type: 'checkbox',
                  })}
                  styles={{
                    label: {
                      order: -2,
                      color: '#000000',
                    },
                  }}
                  data-testid="marketingCheckbox"
                />
              </Flex>
            </Group>
            <Group>
              <Button fullWidth type="submit" data-testid="loginAfterSignUp">
                Login
              </Button>
            </Group>
          </Stack>
        </Stack>
      </form>
    </LayoutLogin>
  );
}

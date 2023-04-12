import {
  Button,
  Stack,
  Text,
  Flex,
  Group,
  Notification,
  Checkbox,
} from '@collinsonx/design-system/core';
import { useForm } from '@collinsonx/design-system/form';
import LayoutLogin from '../components/LayoutLogin';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { DatePicker, InputLabel, PageTitle } from '@collinsonx/design-system';
import { ComponentProps, useState } from 'react';
import updateConsumer from '@collinsonx/utils/mutations/updateConsumer';
import { useMutation } from '@collinsonx/utils/apollo';
import { ConsumerInput } from '@collinsonx/utils';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import validateEmail from '@collinsonx/utils/lib/validateEmail';
import LoaderLifestyleX from '@collinsonx/design-system/components/loaderLifestyleX';

export default function SignupUser() {
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(new Date());
  const [loading, setLoading] = useState(false);
  const DATE_FORMAT = 'DD/MM/YYYY';

  const { email } = router.query;

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    console.log('date ', date);
    setDate(date as Date);
  };

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
              console.log('success ', data);
              if (data?.updateConsumer?.id) {
                router.push('/lounge');
              }
            },
            onError: () => {
              setLoading(false);
            },
          });
        })}
      >
        <Stack spacing={50}>
          <Stack spacing={24} sx={{ height: '100%' }}>
            <PageTitle title="Sign up with email" url="/" variant="white" />

            <InputLabel
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('firstname')}
              placeholder="First name"
              label="First name(s)"
              isWhite={true}
            />

            <InputLabel
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('lastname')}
              placeholder="Last name"
              label="Last name"
              isWhite={true}
            />
            <DatePicker
              icon={<Calendar />}
              sx={({ colors }) => ({
                '.mantine-Input-icon': {
                  paddingLeft: 14,
                },
                Input: {
                  paddingLeft: 56,
                  border: '1px solid #CED4DA',
                  borderRadius: 4,
                  color: colors.gray[6],
                },
              })}
              label="Date of birth"
              placeholder="Pick a date"
              clearable={false}
              valueFormat={DATE_FORMAT}
              {...form.getInputProps('dateOfBirth')}
              maxDate={new Date()}
              onChange={handleChangeDate}
            />
            <InputLabel
              readOnly
              autoFocus
              type="email"
              withAsterisk
              {...form.getInputProps('email')}
              value={email}
              placeholder="Your email address"
              label="Your email address"
              isWhite={true}
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
                      color: '#FFFFFF',
                    },
                  }}
                />
              </Flex>
            </Group>
            <Group>
              <Button fullWidth type="submit">
                Login
              </Button>
            </Group>
          </Stack>
        </Stack>
      </form>
    </LayoutLogin>
  );
}

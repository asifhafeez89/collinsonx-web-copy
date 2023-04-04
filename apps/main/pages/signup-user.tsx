import {
  Button,
  Stack,
  Text,
  Box,
  Flex,
  Group,
  Notification,
  Checkbox,
} from '@collinsonx/design-system/core';
import { useForm } from '@mantine/form';
import LayoutLogin from '../components/LayoutLogin';
import dayjs from 'dayjs';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { DatePicker, InputLabel, PageTitle } from '@collinsonx/design-system';
import { LoginCode } from '@collinsonx/design-system/assets/graphics';
import { ComponentProps, useState } from 'react';
import findOrCreateConsumer from '@collinsonx/utils/mutations/findOrCreateConsumer';
import { useMutation } from '@collinsonx/utils/apollo';
import { ConsumerInput } from '@collinsonx/utils';

export default function SignupUser() {
  const [date, setDate] = useState(dayjs(new Date()).format());
  const DATE_FORMAT = 'DD/MM/YYYY';

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(dayjs(date).format());
  };

  const form = useForm({
    initialValues: {
      email: '',
      firstname: null,
      lastname: null,
      termsOfService: false,
      TMEmail: false,
      dateOfBirth: new Date(),
    },

    validate: {
      email: (value: string) =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? null
          : 'Please enter a valid email address.',
      firstname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your name.',
      lastname: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const [findOrCreateConsumerCall, { loading, error, data }] =
    useMutation(findOrCreateConsumer);

  return (
    <>
      {!!error && (
        <Notification color="red">
          {error.graphQLErrors.map((error, index) => (
            <Text key={index}>{error.message}</Text>
          ))}
        </Notification>
      )}

      <form
        onSubmit={form.onSubmit((values: any) => {
          const consumerInput: ConsumerInput = {
            dateOfBirth: values.dateOfBirth,
            firstName: values.name,
            lastName: values.lastname,
            marketingConsent: false,
            emailAddress: values.email,
          };
          findOrCreateConsumerCall({
            variables: { consumerInput },
            onCompleted: () => {
              console.log('success!');
            },
          });
        })}
      >
        <Stack spacing={50}>
          <Stack spacing={24} sx={{ height: '100%' }}>
            <PageTitle
              title={' Sign up with email'}
              url={`/`}
              variant={'white'}
            />
            <InputLabel
              autoFocus
              type="email"
              withAsterisk
              {...form.getInputProps('email')}
              placeholder="Your email address"
              label="Your email address"
              isWhite={true}
            />

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
              inputFormat={DATE_FORMAT}
              defaultValue={dayjs(date).toDate()}
              {...form.getInputProps('dateOfBirth')}
              onChange={handleChangeDate}
            />
            <Text>
              We will send you a unique code via email to complete the login.
            </Text>
            <Group>
              <Flex mih={50} align="flex-start" direction="row" wrap="wrap">
                <Checkbox
                  label="I agree to receive personalised marketing emails."
                  {...form.getInputProps('termsOfService', {
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
    </>
  );
}

SignupUser.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

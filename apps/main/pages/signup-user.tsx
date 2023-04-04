import {
  Button,
  Stack,
  Text,
  Box,
  Flex,
  TextInput,
  Group,
  Notification,
} from '@collinsonx/design-system/core';
import { useForm } from '@mantine/form';
import LayoutLogin from '../components/LayoutLogin';
import dayjs from 'dayjs';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { DatePicker, PageTitle } from '@collinsonx/design-system';
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
      TMEmail: false,
      dateOfBirth: new Date(),
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Please enter a valid email address.',
    },
  });
  const fields = {
    email: {
      fieldName: 'email',
      error: 'Please add your email',
      value: '',
    },
  };

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
            <TextInput
              autoFocus
              type="email"
              withAsterisk
              {...form.getInputProps('email')}
              placeholder="Your email address"
              label="Your email address"
            />

            <TextInput
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('name')}
              placeholder="First name"
              label="First name(s)"
            />

            <TextInput
              autoFocus
              type="text"
              withAsterisk
              {...form.getInputProps('lastname')}
              placeholder="Last name"
              label="Last name"
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
            <Group position="right">
              <Flex
                mih={50}
                gap="250px"
                justify="flex-start"
                align="flex-start"
                direction="row"
                wrap="wrap"
              >
                {/*<Text>Email</Text> <Switch value="email" size="md" />*/}
              </Flex>
            </Group>
            <Group>
              <Button fullWidth type="submit">
                Login
              </Button>
            </Group>
          </Stack>
          <Flex mt={58} align="center" direction="column">
            <Box
              sx={{
                width: '100%',
                maxWidth: '342px',
                maxHeight: '304px',
              }}
            >
              <LoginCode />
            </Box>
          </Flex>
        </Stack>
        <div
          style={{
            position: 'absolute',
            bottom: '-500px',
            left: 0,
            overflow: 'hidden',
            width: '100%',
            height: '50%',
          }}
        >
          <div
            style={{
              backgroundColor: '#47D4B1',
              width: '55vh',
              height: '55vh',
              position: 'absolute',
              right: '-20px',
              bottom: '-190px',
              borderRadius: '50%',
            }}
          />
        </div>
      </form>
    </>
  );
}

SignupUser.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

import {
  Button,
  Title,
  Stack,
  Text,
  Box,
  Flex,
  TextInput,
  Group,
  Switch,
} from '@collinsonx/design-system/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';
import LayoutLogin from '../components/LayoutLogin';
import dayjs from 'dayjs';

import { Calendar } from '@collinsonx/design-system/assets/icons';

import { DatePicker } from '@collinsonx/design-system';
import { LoginCode } from '@collinsonx/design-system/assets/graphics';
import { ComponentProps, useState } from 'react';
import theme from '@collinsonx/design-system/themes/experienceX';

export default function CheckEmail() {
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
      termsOfService: false,
    },

    validate: {
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : 'Invalid email',
    },
  });
  const fields = {
    email: {
      fieldName: 'email',
      error: 'Please add your email',
      value: '',
    },
  };

  const handleConfirmDetails = () => {};

  return (
    <form onSubmit={form.onSubmit((values: any) => console.log(values))}>
      <Stack spacing={50}>
        <Stack spacing={24} sx={{ height: '100%' }}>
          <Title order={1} size={20}>
            Sign up with email
          </Title>
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
            onChange={handleChangeDate}
          />
          <Text>
            We will only contact you about your booking. By choosing how
            you&apos;d like to hear from us you opt in to communication.
          </Text>
          <Group position="right">
            <Flex
              mih={50}
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="wrap"
            >
              <Text>Email</Text> <Switch size="md" />
            </Flex>
          </Group>
          <Group>
            <Button fullWidth type="submit">
              Submit
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
  );
}

CheckEmail.getLayout = (page: JSX.Element) => <LayoutLogin>{page}</LayoutLogin>;

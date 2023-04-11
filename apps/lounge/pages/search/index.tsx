import { useState, useEffect, ComponentProps } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container } from '@collinsonx/design-system/core';

import { Calendar } from '@collinsonx/design-system/assets/icons';
import { Heading } from '@collinsonx/design-system/components/heading/Heading';
import { Text, Stack, Group, Button } from '@collinsonx/design-system/core';
import FormWrapper from '@collinsonx/design-system/components/formWrapper/formWrapper';
import { DatePicker, InputLabel } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';
import dayjs from 'dayjs';

export default function Search() {
  const [date, setDate] = useState<Date | null>(new Date());
  const DATE_FORMAT = 'DD/MM/YYYY';
  const form = useForm({
    initialValues: {
      flightNumber: '',
      dateofFlight: new Date('1990-01-01'),
    },

    validate: {
      flightNumber: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(date);
  };

  return (
    <>
      <Container>
        <Stack spacing={50} sx={{ padding: 0, margin: 0 }}>
          <Heading as="h1" subtitle="Welcome">
            Tony Stark
          </Heading>
          <Text>
            Visiting an airport lounge can be a great way to make your travel
            experience more comfortable, enjoyable, and stress-free.
          </Text>
        </Stack>
      </Container>
      <FormWrapper>
        <Heading as="h2">Experience starts now</Heading>
        <Text
          sx={({ colors }) => ({
            marginBottom: 20,
          })}
        >
          With your flight details we can configure our experiences for you to
          choose from.
        </Text>
        <form>
          <InputLabel
            autoFocus
            type="text"
            withAsterisk
            {...form.getInputProps('lastname')}
            placeholder="Last name"
            label="Last name"
            isWhite={false}
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
                marginBottom: 20,
                width: '100%',
              },
              label: {
                color: colors.gray[6],
              },
            })}
            label="Date of birth"
            placeholder="Pick a date"
            clearable={false}
            inputFormat={DATE_FORMAT}
            {...form.getInputProps('dateOfBirth')}
            maxDate={dayjs(date).toDate()}
            onChange={handleChangeDate}
          />
          <Button fullWidth type="submit">
            Login
          </Button>
        </form>
      </FormWrapper>
    </>
  );
}

Search.getLayout = (page: JSX.Element) => (
  <LayoutPaddingLess>{page}</LayoutPaddingLess>
);

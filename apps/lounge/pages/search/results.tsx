import { useState, useEffect, ComponentProps } from 'react';
import LayoutPaddingLess from '@components/LayoutPaddingLess';
import { Container } from '@collinsonx/design-system/core';

import { Stack } from '@collinsonx/design-system/core';
import { DatePicker } from '@collinsonx/design-system';
import { useForm } from '@collinsonx/design-system/form';

export default function Search() {
  const [date, setDate] = useState<Date | null>(new Date());
  const DATE_FORMAT = 'DD/MM/YYYY';
  const form = useForm({
    initialValues: {
      flightNumber: '',
      dateofflight: new Date('1990-01-01'),
    },

    validate: {
      flightNumber: (value: string) =>
        value?.length > 0 ? null : 'Please enter your last name.',
    },
  });

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(date as Date);
  };

  return (
    <div style={{ background: '#f5f5f5', height: '100vh' }}>
      <Container sx={{ background: '#25262B' }}>
        <Stack
          spacing={10}
          sx={{
            paddingTop: '20px',
            margin: '0',
          }}
        ></Stack>
      </Container>
      <div
        style={{
          position: 'relative',
          display: 'block',
          height: '70vh',
          top: '0px',
          background: '#25262B',
          backgroundPositionY: 'center',
        }}
      >
        <div
          style={{
            opacity: '0.5',
            zIndex: 400,
            height: '40vh',
            width: '100%',
            background: 'black',
            position: 'absolute',
            top: '20px',
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            top: '0px',
            zIndex: 1100,
          }}
        ></div>

        {/* <FormWrapper>
          <Heading as="h2">Experience starts now</Heading>

          <form onSubmit={(values) => console.log(values)} c>
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
                  color: colors.gray[8],
                  marginTop: '10px',
                },
              })}
              label="Date of flight"
              placeholder="Pick a date"
              clearable={false}
              valueFormat={DATE_FORMAT}
              maxDate={new Date()}
              {...{
                ...form.getInputProps('dateofflight'),
                value: date,
                onChange: handleChangeDate,
              }}
              required={true}
            />
            <Button fullWidth type="submit">
              Login
            </Button>
          </form>
        </FormWrapper> */}
      </div>
    </div>
  );
}

Search.getLayout = (page: JSX.Element) => (
  <LayoutPaddingLess>{page}</LayoutPaddingLess>
);

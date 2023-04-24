import {
  Box,
  Button,
  Flex,
  Stack,
  Title,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { InputSelect, DatePicker } from '@collinsonx/design-system';
import ArrivalTime from '@components/ArrivalTime';

import { useForm } from '@collinsonx/design-system/form';
import { ComponentProps, useEffect, useState } from 'react';
import { getLoungeArrivalTime } from 'lib';

export interface BookingFormValue {
  date: Date;
}

export interface BookingFormProps {
  onSubmit: (values: BookingFormValue) => void;
}

function expandHours(hour: string) {
  const minutes = ['00', '15', '30', '45'];
  return minutes.map((min) => `${hour}:${min}`);
}

function createTimeSlots() {
  let hours = [];
  for (let i = 0; i <= 23; i++) {
    const hour = i.toString().padStart(2, '0');
    hours.push(...expandHours(hour).map((val) => ({ label: val, value: val })));
  }
  return hours;
}

const TIME_SLOTS = createTimeSlots();
const DATE_FORMAT = 'DD/MM/YYYY';

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [arrivalTime, setArrivalTime] = useState<string>();

  const form = useForm({
    initialValues: {
      date: new Date(),
      time: '',
    },

    validate: {
      time: (value: string) =>
        value.length > 0 ? null : 'Please choose a time',
    },
  });

  const handleChangeDate: ComponentProps<typeof DatePicker>['onChange'] = (
    date
  ) => {
    setDate(date as Date);
  };

  useEffect(() => {
    const time = form.getInputProps('time').value;
    if (time) {
      const d = new Date();
      const [h, m] = time.split(':');
      d.setHours(Number.parseInt(h, 10));
      d.setMinutes(Number.parseInt(m, 10));
      d.setSeconds(0);
      setArrivalTime(getLoungeArrivalTime(d));
    } else {
      setArrivalTime('');
    }
  }, [form, setArrivalTime]);

  return (
    <Box bg="white" px={24}>
      <Flex direction="column">
        <Stack spacing={24}>
          <Title order={4} pt={24}>
            Your details
          </Title>
          <form
            onSubmit={form.onSubmit((values: any) => {
              const d = date;
              const [h, m] = values.time.split(':');
              d.setHours(Number.parseInt(h, 10));
              d.setMinutes(Number.parseInt(m, 10));
              d.setSeconds(0);

              onSubmit({ date: d });
            })}
          >
            <Stack spacing={16}>
              <DatePicker
                icon={<Calendar />}
                label="Date"
                placeholder="Pick a date"
                clearable={false}
                minDate={new Date()}
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
                  label: {
                    color: '#000',
                    marginBottom: 8,
                  },
                })}
                {...{
                  ...form.getInputProps('date'),
                  onChange: handleChangeDate,
                  value: date,
                }}
              />
              <InputSelect
                label="Your flight time"
                placeholder="--:--"
                withAsterisk
                required={true}
                data={TIME_SLOTS}
                {...form.getInputProps('time')}
              />
              <UnstyledButton
                sx={{
                  borderRadius: 8,
                  background: '#fff',
                  color: '#000',
                  padding: '12px 24px',
                  width: '30%',
                  textAlign: 'center',
                  fontSize: '18px',
                  border: '1px solid black',
                }}
              >
                Apply
              </UnstyledButton>
              {arrivalTime && (
                <Box pt={16} pb={24} sx={{ borderTop: '1px solid #C8C9CA' }}>
                  <ArrivalTime time={arrivalTime} />
                </Box>
              )}
            </Stack>

            <Button
              type="submit"
              maw={410}
              sx={{
                height: 45,
                padding: '12px 24px',
                width: '100%',
                textAlign: 'center',
                fontSize: '18px',
                marginBottom: '1rem',
              }}
            >
              Request lounge booking
            </Button>
          </form>
        </Stack>
      </Flex>
    </Box>
  );
}

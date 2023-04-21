import {
  Box,
  Flex,
  Stack,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { InputSelect, DatePicker } from '@collinsonx/design-system';
import ArrivalTime from '@components/ArrivalTime';

import { useForm } from '@collinsonx/design-system/form';
import { ComponentProps, useEffect, useState } from 'react';
import { getLoungeArrivalTime } from 'lib';
import Heading from '@collinsonx/design-system/components/heading/Heading';

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
    <div
      style={{
        margin: '0 -40px',
        padding: '40px',
        borderBottom: '4px solid #ccc',
        background: '#fff',
      }}
    >
      <Flex direction="column">
        <Stack spacing={30}>
          <Heading as="h3">Your details</Heading>
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
                  fontWeight: 'bold',
                  color: '#000',
                  marginBottom: 10,
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
            {arrivalTime && <ArrivalTime time={arrivalTime} />}

            <UnstyledButton
              type="submit"
              sx={{
                borderRadius: 8,
                background: '#fff',
                color: '#000',
                padding: '12px 24px',
                width: '30%',
                textAlign: 'center',
                fontSize: '18px',
                marginTop: '20px',
                border: '1px solid black',
              }}
            >
              Apply
            </UnstyledButton>
          </form>
        </Stack>
      </Flex>
    </div>
  );
}

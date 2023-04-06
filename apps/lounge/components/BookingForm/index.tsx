import {
  Box,
  Flex,
  Text,
  Stack,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import { Calendar } from '@collinsonx/design-system/assets/icons';
import { InputSelect, DatePicker } from '@collinsonx/design-system';
import dayjs from 'dayjs';
import ArrivalTime from '@components/ArrivalTime';

import { useForm } from '@collinsonx/design-system/form';
import { useState } from 'react';

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
  const [time, setTime] = useState<string>();
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

  return (
    <Flex direction="column">
      <Stack spacing={30}>
        <form
          onSubmit={form.onSubmit((values: any) => {
            const d = new Date(values.date);
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
            defaultValue={new Date(2022, 1)}
            minDate={dayjs(date).toDate()}
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
              },
            })}
            {...form.getInputProps('date')}
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
              background: '#000000',
              color: '#ffffff',
              padding: '12px 24px',
              width: '100%',
              textAlign: 'center',
              fontSize: '18px',
            }}
          >
            Confirm details
          </UnstyledButton>
        </form>
      </Stack>
    </Flex>
  );
}

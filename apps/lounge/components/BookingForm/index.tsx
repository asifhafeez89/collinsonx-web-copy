import { Flex, Paper, UnstyledButton } from '@collinsonx/design-system/core';
import {
  InputSelect,
  InputTextArea,
  DatePicker,
} from '@collinsonx/design-system';
import { Clock } from '@collinsonx/design-system/assets/icons';
import { ComponentProps, useState } from 'react';
import dayjs from 'dayjs';

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

function formatDate(date: Date) {
  return dayjs(date).format(DATE_FORMAT);
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState('00:00');

  const onChangeDate = (newDate: Date) => {
    newDate.setSeconds(0);
    newDate.setHours(date.getHours());
    newDate.setMinutes(date.getMinutes());
    setDate(newDate);
  };

  const onChangeTime = (newTime: string) => {
    const d = new Date(date);
    const [h, m] = newTime.split(':');
    d.setHours(Number.parseInt(h, 10));
    d.setMinutes(Number.parseInt(m, 10));
    d.setSeconds(0);
    setDate(d);
    setTime(newTime);
  };

  const handleClickConfirm = () => {
    onSubmit({
      date: date,
    });
  };

  return (
    <Flex direction="column">
      <Paper mt={10} radius="md">
        <DatePicker
          placeholder="Pick date"
          label="Date"
          withAsterisk
          clearable={false}
          inputFormat={DATE_FORMAT}
          labelFormat={DATE_FORMAT}
          value={date}
          styles={{
            label: {
              color: 'black',
              fontWeight: 600,
            },
          }}
          onChange={onChangeDate}
        />
      </Paper>
      <Paper mt={30} radius="md">
        <InputSelect
          label="Time of arrival"
          withAsterisk
          description="Please check lounge conditions for access times"
          icon={<Clock size={14} />}
          value={time}
          data={TIME_SLOTS}
          onChange={onChangeTime}
          required
        />
      </Paper>
      <Paper mt={30} radius="md">
        <UnstyledButton
          onClick={handleClickConfirm}
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
      </Paper>
    </Flex>
  );
}

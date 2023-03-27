import {
  Box,
  Flex,
  Text,
  Stack,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import { InputSelect, DatePicker } from '@collinsonx/design-system';
import { Warning } from '@collinsonx/design-system/assets/icons';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import WarningBox from '@components/WarningBox';
import ArrivalTime from '@components/ArrivalTime';
import { LOUNGE_HOURS_OFFSET } from 'config/lounge';
import { getLoungeArrivalTime } from '../../lib/index';

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

  useEffect(() => {
    if (date && time) {
      setArrivalTime(getLoungeArrivalTime(date));
    }
  }, [date, time]);

  return (
    <Flex direction="column">
      <Stack spacing={30}>
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
        <InputSelect
          label="Your flight time"
          placeholder="--:--"
          withAsterisk
          value={time}
          data={TIME_SLOTS}
          onChange={onChangeTime}
          required
        />
        {arrivalTime && <ArrivalTime time={arrivalTime} />}

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
      </Stack>
    </Flex>
  );
}

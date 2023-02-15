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
  date: string;
  comment: string;
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
const DATE_FORMAT = 'MM/DD/YYYY';

function formatDate(date: Date) {
  return dayjs(date).format(DATE_FORMAT);
}

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<string>();
  const [comment, setComment] = useState('');

  const onChangeDate = (newDate: Date) => {
    setDate(formatDate(newDate) + ' ' + '00:00');
  };

  const onChangeTime = (newTime: string) => {
    setDate((date ?? formatDate(new Date())).substring(0, 10) + ' ' + newTime);
  };

  const onChangeComment: ComponentProps<typeof InputTextArea>['onChange'] = (
    e
  ) => {
    setComment(e.target.value);
  };

  const handleClickConfirm = () => {
    onSubmit({
      date: date!,
      comment,
    });
  };

  const valueTime = date ? date.substring(11) : undefined;

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
          value={date ? new Date(date) : undefined}
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
          value={valueTime}
          data={TIME_SLOTS}
          onChange={onChangeTime}
          required
        />
      </Paper>
      <Paper mt={30} radius="md">
        <InputTextArea
          placeholder="Your comment"
          label="Your comment"
          description="Add any considerations for lounge staff"
          autosize
          minRows={2}
          maxRows={4}
          value={comment}
          onChange={onChangeComment}
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

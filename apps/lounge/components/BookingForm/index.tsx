import {
  Anchor,
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from '@collinsonx/design-system/core';
import { Calendar, Edit } from '@collinsonx/design-system/assets/icons';
import { InputSelect, DatePicker } from '@collinsonx/design-system';
import ArrivalTime from '@components/ArrivalTime';

import { useForm } from '@collinsonx/design-system/form';
import { ComponentProps, useEffect, useState } from 'react';
import { getLoungeArrivalTime } from 'lib';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
const DATE_FORMAT = 'DD MMMM YYYY';

export default function BookingForm({ onSubmit }: BookingFormProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [edit, setEdit] = useState<boolean>(true);
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

  const handleClickBook = () => {
    const [h, m] = arrivalTime!.split(':');

    const utcDate = dayjs
      .utc(date)
      .hour(Number.parseInt(h, 10))
      .minute(Number.parseInt(m, 10));

    onSubmit({ date: utcDate.toDate() });
  };

  const handleClickEdit = () => {
    setEdit(true);
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
    <Flex direction="column">
      <Stack spacing={24}>
        <form
          onSubmit={form.onSubmit((values: any) => {
            const d = date;
            const [h, m] = values.time.split(':');
            d.setHours(Number.parseInt(h, 10));
            d.setMinutes(Number.parseInt(m, 10));
            d.setSeconds(0);

            setEdit(false);
          })}
        >
          <Stack spacing={8}>
            <Box bg="white" px={24} pb={24}>
              <Flex justify="space-between" py={24}>
                <Title order={4}>Your details</Title>
                {!edit && <Edit w={18} h={18} onClick={handleClickEdit} />}
              </Flex>

              <Stack spacing={16}>
                {edit ? (
                  <>
                    <DatePicker
                      icon={<Calendar />}
                      label="Date"
                      placeholder="Pick a date"
                      clearable={false}
                      minDate={new Date()}
                      valueFormat={DATE_FORMAT}
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
                      type="submit"
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
                  </>
                ) : (
                  <>
                    <Box>
                      <Text fw={600} color="#000" size={16}>
                        Date of flight
                      </Text>
                      <Text pt={4}>{dayjs(date).format(DATE_FORMAT)}</Text>
                    </Box>
                    <Box>
                      <Text fw={600} color="#000" size={16}>
                        Your flight time
                      </Text>
                      <Text pt={4}>{dayjs(date).format('HH:mm')}</Text>
                    </Box>
                  </>
                )}
                {arrivalTime && (
                  <Box pt={16} sx={{ borderTop: '1px solid #C8C9CA' }}>
                    <ArrivalTime time={arrivalTime} />
                  </Box>
                )}
              </Stack>
            </Box>
            {!edit && (
              <Box bg="white" p={24}>
                <Title order={4}>Cancellation policy</Title>
                <Text size={14}>
                  Free cancellation for 24 hours. Cancel before{' '}
                  <strong>{dayjs(date).format(DATE_FORMAT)}</strong> for a
                  partial refund.
                </Text>
              </Box>
            )}

            <Box bg="white" p={24}>
              <Button
                onClick={handleClickBook}
                disabled={edit}
                maw={410}
                sx={{
                  height: 45,
                  padding: '12px 24px',
                  width: '100%',
                  textAlign: 'center',
                  fontSize: '18px',
                }}
              >
                Request lounge booking
              </Button>
            </Box>
          </Stack>
        </form>
      </Stack>
    </Flex>
  );
}

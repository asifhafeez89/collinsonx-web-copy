import dayjs from 'dayjs';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { useForm, UseFormReturnType } from '@mantine/form';
import {
  TextInput,
  LoadingOverlay,
  Title,
  Stack,
  Flex,
} from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';

import { InputLabel } from '@collinsonx/design-system';

type SetState<T> = Dispatch<SetStateAction<T | undefined>>;

interface FlightInfoProps {
  form: UseFormReturnType<any, any>;
  loading: boolean;
}

export interface AvailabilitySlot {
  startDate: string;
  endDate: string;
  maxDuration: number;
}

export const FlightInfo = ({ form, loading }: FlightInfoProps) => {
  const [flightNumberError, setFlightNumberError] = useState(false);
  const [flightNumErrorText, setFlightNumErrorText] = useState(
    'Please enter a flight number'
  );
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);

  return (
    <>
      <LoadingOverlay visible={flightInfoLoading} overlayBlur={2} />
      <Stack spacing={16}>
        <Title order={3} size={18}>
          Flight Details
        </Title>
        <Flex direction="row" justify="space-between">
          <DatePickerInput
            icon={<IconCalendar size="1.5rem" stroke={1.5} />}
            label="Departure Date"
            placeholder="Pick a date"
            minDate={new Date()}
            maw={400}
            w={270}
            required={true}
            disabled={loading}
            withAsterisk
            {...form.getInputProps('departureDate')}
          />
          <InputLabel
            label="Flight Number"
            placeholder="Flight Number"
            required={true}
            withAsterisk
            disabled={loading}
            fz={18}
            w={270}
            error={'invalid flight number'}
            {...form.getInputProps('flightNumber')}
            isCapitalLetters={true}
          />
        </Flex>
      </Stack>
    </>
  );
};

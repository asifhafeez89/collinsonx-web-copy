import dayjs from 'dayjs';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

import {
  TextInput,
  LoadingOverlay,
  Title,
  Stack,
  Flex,
} from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import { validateFlightNumber } from '../../utils/flightValidation';
import { FlightDetails } from '@collinsonx/utils';
import { ViewStep } from 'types/booking';
import { DATE_FORMAT } from 'config/Constants';

type SetState<T> = Dispatch<SetStateAction<T | undefined>>;

interface FlightInfoComponentProps {
  date?: string;
  flightNumber?: string;
  onChangeDate: Dispatch<SetStateAction<string>>;
  onChangeFlightNumber: SetState<string>;
  step: ViewStep;
  loading: boolean;

  onError?: (newError: any) => void;
  screenName?: string;
  inputTestId?: string;
  datePickerTestId?: string;
  timePickerTestId?: string;
}

interface FlightInfoProps {
  flightInfo: FlightDetails;
}

export interface AvailabilitySlot {
  startDate: string;
  endDate: string;
  maxDuration: number;
}

export const FlightInfo = ({
  date,
  flightNumber,
  onChangeDate,
  onChangeFlightNumber,
  loading,
}: FlightInfoComponentProps) => {
  const [flightNumberError, setFlightNumberError] = useState(false);
  const [flightNumErrorText, setFlightNumErrorText] = useState(
    'Please enter a flight number'
  );
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);

  const onFlightNumberChange: ChangeEventHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const trimmed = event.target.value?.trim() ?? '';
    if (!trimmed) {
      setFlightNumberError(true);
      setFlightNumErrorText('Please enter a flight number');
    } else if (!validateFlightNumber(trimmed)[0]) {
      setFlightNumberError(true);
      setFlightNumErrorText('Please enter a valid flight number');
    } else {
      setFlightNumberError(false);
    }
    onChangeFlightNumber(trimmed);
  };

  const onDateChanged = (date: Date) => {
    onChangeDate(dayjs(date).format(DATE_FORMAT));
  };

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
            placeholder="Departure Date"
            disabled={loading}
            maw={400}
            w={270}
            minDate={new Date()}
            value={dayjs(date).toDate()}
            onChange={onDateChanged}
            error={dateError ? dateErrorText : ''}
            required={true}
            withAsterisk
          />
          <TextInput
            disabled={loading}
            label="Flight Number"
            placeholder="Flight Number"
            value={flightNumber}
            onChange={onFlightNumberChange}
            error={flightNumberError ? flightNumErrorText : ''}
            required={true}
            withAsterisk
            fz={18}
            w={270}
          />
        </Flex>
      </Stack>
    </>
  );
};

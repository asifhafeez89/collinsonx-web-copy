import dayjs from 'dayjs';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import {
  TextInput,
  Button,
  Group,
  Box,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Text,
  Grid,
  Modal,
  LoadingOverlay,
  Title,
  Stack,
  Flex,
} from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import { validateFlightNumber } from '../../utils/flightValidation';
import axios from 'axios';
import { APIFlightInfoResponse, APIFlightInfo } from 'pages/api/flight';
import FlightInfoNew from '../flightInfo/FlightInfoNew';
import { FlightDetails, Slots } from '@collinsonx/utils';
import FlightData from './FlightData';
import { ViewStep } from 'types/booking';

type SetState<T> = Dispatch<SetStateAction<T | undefined>>;

interface FlightInfoComponentProps {
  date?: string;
  flightNumber?: string;
  onChangeDate: SetState<string>;
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
  onError,
  screenName,
  inputTestId,
  datePickerTestId,
  timePickerTestId,

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
  const [flightDate, setFlightDate] = useState<Date>(new Date());
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoError, setFlightInfoError] = useState('');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState<number | ''>(1);
  const [guestscount, setGuestsCount] = useState<number>(1);
  const handlers = useRef<NumberInputHandlers>();
  const [flightInfoDtls, setflightInfoDtls] = useState<APIFlightInfo | null>(
    null
  );
  const [flightData, setflightData] = useState<FlightDetails>();

  const [showComponent, setShowComponent] = useState(false);

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

  const onDateChanged = (newDate: Date) => {
    if (!newDate) {
      setDateError(true);
    }
    setFlightDate(newDate);
    setDateError(false);
  };

  const onSearch = () => {
    setFlightInfoLoading(true);
    if (flightInfoLoading) {
      return;
    }

    if (!validateFlightNumber(flightNumber || '')[0]) {
      setFlightNumberError(true);
      return;
    }

    if (!flightDate) {
      setDateError(true);
      return;
    }

    setFlightInfoError('');
    setShowComponent(true);
    const guestCount = Number(numberOfGuests);
    setGuestsCount(guestCount);
  };

  const setLoadingOverlay = () => {
    setFlightInfoLoading(false);
  };
  const onFlightInfoSuccess = (flightDetails: FlightDetails) => {
    setflightData(flightDetails);
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
            value={flightDate}
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
        {/*
        <Group position="center">
          <Button onClick={onSearch}>CHECK AVAILABILITY</Button>
          {flightData ? (
            <FlightInfoNew
              flightInfo={flightData}
              setLoadingOverlay={setLoadingOverlay}
              numberOfGuests={guestscount}
            ></FlightInfoNew>
          ) : (
            ''
          )}
        </Group>
          <Group>
            <Text style={{ marginTop: '20px', color: 'red' }}>
              {flightInfoError}
            </Text>
          </Group>
            */}
      </Stack>

      {showComponent && (
        <FlightData
          flightNumber={flightNumber || ''}
          departureDate={flightDate}
          onSuccess={onFlightInfoSuccess}
        ></FlightData>
      )}
    </>
  );
};

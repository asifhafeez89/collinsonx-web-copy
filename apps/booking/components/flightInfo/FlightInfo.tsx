import dayjs from 'dayjs';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useRef,
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
} from '@collinsonx/design-system/core';
import {
  DatePickerInput,
} from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import { validateFlightNumber } from '../../utils/flightValidation';
import axios from 'axios';
import { APIFlightInfoResponse,APIFlightInfo } from 'pages/api/flight';
import  FlightInfoNew  from '../flightInfo/FlightInfoNew';
interface FlightInfoComponentProps {
  onSuccess: (data: any) => void;
  onError?: (newError: any) => void;
  screenName?: string;
  inputTestId?: string;
  datePickerTestId?: string;
  timePickerTestId?: string;
}

interface FlightInfoProps {
  flightInfo: APIFlightInfo
}

export interface AvailabilitySlot {
  startDate: string;
  endDate: string;
  maxDuration: number;
}

export const FlightInfo = ({
  onError,
  onSuccess,
  screenName,
  inputTestId,
  datePickerTestId,
  timePickerTestId,
}: FlightInfoComponentProps) => {

  const [flightNumber, setFlightNumber] = useState('');
  const [flightNumberError, setFlightNumberError] = useState(false);
  const [flightNumErrorText, setFlightNumErrorText] = useState('Please enter a flight number');
  const [flightDate, setFlightDate] = useState<Date>();
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoError, setFlightInfoError] = useState('');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const [numberOfGuests, setNumberOfGuests] = useState<number | ''>(1);
  const handlers = useRef<NumberInputHandlers>();
  const [flightInfoDtls, setflightInfoDtls] = useState<APIFlightInfo | null>(null);

  const onFlightNumberChange: ChangeEventHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
    setFlightNumber(trimmed);
  };

  const onDateChanged = (newDate: Date) => {
    if (!newDate) {
      setDateError(true);
    }
    setFlightDate(newDate);
    setDateError(false);
  };
  const getFlightDetails = async () => {
    const flightBreakdown = validateFlightNumber(flightNumber);
    try {
        const response = await axios.post<APIFlightInfoResponse>('/api/flight', {
        carrierCode: flightBreakdown[1] ?? '',
        flightNumber: flightBreakdown[2] ?? '',
        departureDate: dayjs(flightDate).format('YYYY-MM-DD'),
      });
      const flightInformation = response.data.data[0];
      setflightInfoDtls(flightInformation);
      return flightInformation;
    } catch (err: any) {
      setFlightInfoError('No flight found with details supplied. Please check flight number and try again. If the issue persists, please contact support.');
      setFlightInfoLoading(false);
    }
  };

  const getAvailability = async () => {
    const flightInformation = await getFlightDetails();
    if (!flightInformation) {
      setFlightInfoLoading(false);
      setFlightInfoError('No flight found with details supplied. Please check flight number and try again. If the issue persists, please contact support.');
      return;
    }else{
      onSuccess(flightInformation);
    }
  };

  const onSearch = () => {
    
    if (flightInfoLoading) {
      return;
    }

    if (!validateFlightNumber(flightNumber)[0]) {
      setFlightNumberError(true);
      return;
    }

    if (!flightDate) {
      setDateError(true);
      return;
    }

    setFlightInfoError('');
    setFlightInfoLoading(false);
    getAvailability();
  };

  return (
    <>
      <Box maw={320} mx='auto'>
        <LoadingOverlay visible={flightInfoLoading} overlayBlur={2} />
        <TextInput
          label='Flight Number'
          placeholder='Flight Number'
          value={flightNumber}
          onChange={onFlightNumberChange}
          error={flightNumberError ? flightNumErrorText : ''}
          required={true}
          withAsterisk
        />
        <DatePickerInput
          icon={<IconCalendar size='1.5rem' stroke={1.5} />}
          label='Departure Date'
          placeholder='Departure Date'
          maw={400}
          mx='auto'
          minDate={new Date()}
          value={flightDate}
          onChange={onDateChanged}
          error={dateError ? dateErrorText : ''}
          required={true}
          withAsterisk
        />
        <Group spacing={5}>
          <Grid grow>
            <Grid.Col span={12}>
              <Text style={{ marginTop: '10px' }}>
                Number of Guests:
              </Text>
            </Grid.Col>
            <Grid.Col>
              <Grid>
                <Grid.Col span={2}>
                  <ActionIcon size={'2.625rem'} variant='default' onClick={() => handlers.current?.decrement()}>
                    –
                  </ActionIcon>
                </Grid.Col>
                <Grid.Col span={3}>
                  <NumberInput
                    hideControls
                    value={numberOfGuests}
                    onChange={(val) => setNumberOfGuests(val)}
                    handlersRef={handlers}
                    max={10}
                    min={1}
                    step={1}
                    size='md'
                    styles={{ input: { textAlign: 'center' } }}
                  />
                </Grid.Col>
                <Grid.Col span={2}>
                  <ActionIcon size={'2.625rem'} variant='default' onClick={() => handlers.current?.increment()}>
                    +
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </Group>

        <Group position='center' mt='xl'>
          <Button
            variant='outline'
            onClick={onSearch}
          >
            Get Availability
          </Button>
  
{  flightInfoDtls!==null &&  <FlightInfoNew flightInfo={flightInfoDtls}></FlightInfoNew>  }
        </Group>
        <Group>
          <Text style={{ marginTop: '20px', color: 'red' }}>
            {flightInfoError}
          </Text>
        </Group>
      </Box>
     
    </>
  );
};
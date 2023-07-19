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
import { validateFlightNumber } from '../utils/flightValidation';
import axios from 'axios';
import { APIFlightInfoResponse } from 'pages/api/flight';
import { useDisclosure } from '@mantine/hooks';

interface FlightInfoComponentProps {
  onSuccess: (data: any) => void;
  onError?: (newError: any) => void;
  screenName?: string;
  inputTestId?: string;
  datePickerTestId?: string;
  timePickerTestId?: string;
  onSetSelectedSlot: (selectedSlot: AvailabilitySlot) => void;
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
  onSetSelectedSlot,
}: FlightInfoComponentProps) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [availableSlots, setAvailableSlots] = useState(Array<AvailabilitySlot>);
  const [flightNumberError, setFlightNumberError] = useState(false);
  const [flightNumErrorText, setFlightNumErrorText] = useState('Please enter a flight number');
  const [flightDate, setFlightDate] = useState<Date>();
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoError, setFlightInfoError] = useState('');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const [availableSlotsError, setAvailableSlotsError] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState<number | ''>(1);
  const [opened, { open, close }] = useDisclosure(false);
  const handlers = useRef<NumberInputHandlers>();

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

  const onSelectSlot = (index: number) => {
    onSetSelectedSlot(availableSlots[index]);
    close();
  };

  const sortSlots = (slots: AvailabilitySlot[]) => {
    return slots.sort((slotA, slotB) => {
      return dayjs(slotA.startDate).isBefore(dayjs(slotB.startDate)) ? -1 : 1;
    });
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
    }

    try {
      const response = await axios.post('/api/availability', {
        flightInformation: {
            type: 'DEPARTURE',
            dateTime: `${flightInformation?.departure.date.local} ${flightInformation?.departure.time.local}`,
            airport: flightInformation?.departure.airport,
            terminal: '-1'
        },
        guests: {
            adultCount: numberOfGuests,
            childrenCount: 0,
            infantCount: 0
        },
        product: {
            productType: 'lounge',
            productID: '1139',
            supplierCode: '123'
        }
      });

      if (response.data.slots.length === 0) {
        setAvailableSlotsError('No slots available.');
      }
      setAvailableSlots(sortSlots(response.data.slots));
      setFlightInfoLoading(false);
      onSuccess(flightInformation);
      open();
    } catch (err: any) {
      setAvailableSlotsError('An error occurred while trying to get availabiliy. Please try again later. If the issue persists, please contact support.');
      setFlightInfoLoading(false);
      onSuccess(flightInformation);
      open();
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
    setFlightInfoLoading(true);
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
        </Group>
        <Group>
          <Text style={{ marginTop: '20px', color: 'red' }}>
            {flightInfoError}
          </Text>
        </Group>
      </Box>
      <Modal opened={opened} onClose={close} title='Available Slots'>
        <Text style={{ marginBottom: '15px' }}>
          {
            availableSlots.length > 0
            ?
              dayjs(availableSlots[0].startDate).format('DD MMMM YYYY')
            :
              ''
          }
        </Text>
        {
          availableSlots.length > 0
          ?
          <Grid grow>
             {availableSlots.map((slot, i) => (
              <Grid.Col span={1} key={`available-slot-${i}`}>
                <Button variant='outline' onClick={() => { onSelectSlot(i) }} data-selectedslot={i}>
                  {`${dayjs(slot.startDate).format('hh:mm')} - ${dayjs(slot.endDate).format('hh:mm')}`}
                </Button>
              </Grid.Col>
            ))}
          </Grid>

          :
            <Text>
              { availableSlotsError }
            </Text>
        }
      </Modal>
    </>
  );
};
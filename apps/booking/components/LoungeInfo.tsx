import dayjs from 'dayjs';
import {
  ChangeEvent,
  ChangeEventHandler,
  useState,
  useRef,
  useEffect,
} from 'react';
import {
  Anchor,
  Title,
  TextInput,
  Button,
  Group,
  Box,
  Image,
  Flex,
  NumberInput,
  ActionIcon,
  NumberInputHandlers,
  Text,
  Stack,
  SimpleGrid,
  LoadingOverlay,
} from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import { validateFlightNumber } from '../utils/flightValidation';
import axios from 'axios';
import { APIFlightInfoResponse } from 'pages/api/flight';
import { useDisclosure } from '@mantine/hooks';
import { Moon_Dance } from 'next/font/google';

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

export const LoungeInfo = ({
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
  const [flightNumErrorText, setFlightNumErrorText] = useState(
    'Please enter a flight number'
  );
  const [flightDate, setFlightDate] = useState<Date>();
  const [dateError, setDateError] = useState(false);
  const [dateErrorText] = useState('Please select a date');
  const [flightInfoError, setFlightInfoError] = useState('');
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const [availableSlotsError, setAvailableSlotsError] = useState('');
  const [numberOfGuests, setNumberOfGuests] = useState<number | ''>(1);
  const [opened, { open, close }] = useDisclosure(false);
  const [numberOfAdults, setNumberOfAdults] = useState<number | ''>(1);
  const [numberOfChildren, setNumberOfChildren] = useState<number | ''>(0);
  const [numberOfInfants, setNumberOfInfants] = useState<number | ''>(0);
  const [numberOfSeniors, setNumberOfSeniors] = useState<number | ''>(0);
  const handlers = useRef<NumberInputHandlers>();

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
      setFlightInfoError(
        'No flight found with details supplied. Please check flight number and try again. If the issue persists, please contact support.'
      );
      setFlightInfoLoading(false);
    }
  };

  const getAvailability = async () => {
    const flightInformation = await getFlightDetails();

    if (!flightInformation) {
      setFlightInfoLoading(false);
      setFlightInfoError(
        'No flight found with details supplied. Please check flight number and try again. If the issue persists, please contact support.'
      );
      return;
    }

    try {
      const response = await axios.post('/api/availability', {
        flightInformation: {
          type: 'DEPARTURE',
          dateTime: `${flightInformation?.departure.date.local} ${flightInformation?.departure.time.local}`,
          airport: flightInformation?.departure.airport,
          terminal: '-1',
        },
        guests: {
          adultCount: numberOfGuests,
          childrenCount: 0,
          infantCount: 0,
        },
        product: {
          productType: 'lounge',
          productID: '1139',
          supplierCode: '123',
        },
      });

      if (response.data.slots.length === 0) {
        setAvailableSlotsError('No slots available.');
      }
      setAvailableSlots(sortSlots(response.data.slots));
      setFlightInfoLoading(false);
      onSuccess(flightInformation);
      open();
    } catch (err: any) {
      setAvailableSlotsError(
        'An error occurred while trying to get availabiliy. Please try again later. If the issue persists, please contact support.'
      );
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
    <Flex
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Flex
        gap={16}
        bg="rgb(255, 255, 255)"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
        p={24}
      >
        <Image
          width={176}
          height={128}
          mx="auto"
          src="https://cdn03.collinson.cn/lounge-media/image/BHX6-13756.jpg"
          alt="lounge image"
        />
        <Stack>
          <Title order={2} size={32}>
            {'Plaza Premium Lounge'}
          </Title>
          <Text size={18}>{'London Gatwick, North Terminal'}</Text>
          <Text size={28}>{'£8.00 GBP'}</Text>
        </Stack>
      </Flex>

      <Stack sx={{ borderBottom: '1px solid  #C8C9CA' }}>
        <Title order={3} size={18}>
          Flight Details
        </Title>
        <Group spacing={'xl'} pb={24}>
          <DatePickerInput
            icon={<IconCalendar size="1.5rem" stroke={1.5} />}
            label="Date of flight"
            placeholder="Flight Date"
            maw={400}
            fz={18}
            minDate={new Date()}
            value={flightDate}
            onChange={onDateChanged}
            error={dateError ? dateErrorText : ''}
            required={true}
            w={270}
          />
          <TextInput
            label="Flight number"
            placeholder="E.g. EZY123"
            value={flightNumber}
            onChange={onFlightNumberChange}
            error={flightNumberError ? flightNumErrorText : ''}
            required={true}
            fz={18}
            w={270}
          />
        </Group>
      </Stack>

      <Stack>
        <Title order={3} size={18}>
          Who's coming?
        </Title>
        <SimpleGrid cols={2}>
          <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Stack>
              <Text size={18}>Adults</Text>
              <Text size={12}>Ages 12+</Text>
            </Stack>
            <Group>
              <ActionIcon
                size={'2.625rem'}
                variant="default"
                onClick={() => handlers.current?.decrement()}
              >
                –
              </ActionIcon>
              <NumberInput
                hideControls
                value={numberOfAdults}
                onChange={(val) => setNumberOfAdults(val)}
                handlersRef={handlers}
                max={10}
                min={1}
                step={1}
                size="md"
                styles={{ input: { textAlign: 'center' } }}
                w={80}
              />
              <ActionIcon
                size={'2.625rem'}
                variant="default"
                onClick={() => handlers.current?.increment()}
              >
                +
              </ActionIcon>
            </Group>
          </Flex>
          <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Stack>
              <Text size={18}>Children</Text>
              <Text size={12}>Ages 2-11</Text>
            </Stack>
            <Group>
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.decrement()}
            >
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={numberOfChildren}
              onChange={(val) => setNumberOfChildren(val)}
              handlersRef={handlers}
              max={10}
              min={1}
              step={1}
              size="md"
              w={80}
              styles={{ input: { textAlign: 'center' } }}
            />
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.increment()}
            >
              +
            </ActionIcon>
          </Group>
          </Flex>
          <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Stack>
              <Text size={18}>Infants</Text>
              <Text size={12}>Ages 0-2</Text>
            </Stack>
            <Group>
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.decrement()}
            >
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={numberOfInfants}
              onChange={(val) => setNumberOfInfants(val)}
              handlersRef={handlers}
              max={10}
              min={1}
              step={1}
              size="md"
              w={80}
              styles={{ input: { textAlign: 'center' } }}
            />
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.increment()}
            >
              +
            </ActionIcon>

          </Group>
            </Flex>

            <Flex
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Stack>
              <Text size={18}>Infants</Text>
              <Text size={12}>Ages 0-2</Text>
            </Stack>
          <Group>
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.decrement()}
            >
              –
            </ActionIcon>
            <NumberInput
              hideControls
              value={numberOfSeniors}
              onChange={(val) => setNumberOfSeniors(val)}
              handlersRef={handlers}
              max={10}
              min={1}
              step={1}
              size="md"
              w={80}
              styles={{ input: { textAlign: 'center' } }}
            />
            <ActionIcon
              size={'2.625rem'}
              variant="default"
              onClick={() => handlers.current?.increment()}
            >
              +
            </ActionIcon>
          </Group>
             </Flex>
        </SimpleGrid>
        <Text size={14}>
          Refer to <Anchor color="blue">lounge conditions</Anchor> for age
          restrictions
        </Text>
      </Stack>
      <Button>CHECK AVAILABILITY</Button>
    </Flex>
  );
};

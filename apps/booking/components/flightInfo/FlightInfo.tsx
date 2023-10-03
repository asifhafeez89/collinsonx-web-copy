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
  Box,
} from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import colors from 'ui/colour-constants';
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
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);

  return (
    <Box
      sx={{
        '@media (max-width: 768px)': {
          backgroundColor: colors.white,
          padding: '1.2rem 1.2rem',
        },
      }}
    >
      <LoadingOverlay visible={flightInfoLoading} overlayBlur={2} />
      <Stack spacing={16}>
        <Title order={3} size={18}>
          Flight Details
        </Title>
        <Flex
          sx={{
            flexDirection: 'row',

            '@media (max-width: 768px)': {
              flexDirection: 'column',
            },
          }}
          justify="space-between"
        >
          <DatePickerInput
            icon={<IconCalendar size="1.5rem" stroke={1.5} />}
            label="Date of flight"
            placeholder="Flight date"
            minDate={new Date()}
            maw={400}
            w={270}
            disabled={loading}
            withAsterisk
            sx={{}}
            {...form.getInputProps('departureDate')}
            styles={{
              day: {
                '&[data-weekend]': {
                  color: colors.blue,
                },
              },
            }}
          />
          <TextInput
            label="Flight number"
            placeholder="E.g. EZY123"
            withAsterisk
            disabled={loading}
            w={270}
            error={'invalid flight number'}
            {...form.getInputProps('flightNumber')}
          />
        </Flex>
      </Stack>
    </Box>
  );
};

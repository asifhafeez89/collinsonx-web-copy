import { UseFormReturnType } from '@mantine/form';
import { Title, Stack, Flex, Box } from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import colors from 'ui/colour-constants';
import { InputLabel } from '@collinsonx/design-system';
import { ANALYTICS_TAGS } from '../../constants';
import { logAction } from '@lib';

interface FlightInfoProps {
  form?: UseFormReturnType<any, any>;
  loading: boolean;
  tags?: ANALYTICS_TAGS[];
  page?: string;
}

export interface AvailabilitySlot {
  startDate: string;
  endDate: string;
  maxDuration: number;
}

export const FlightInfo = ({
  form,
  loading,
  tags = [],
  page = '',
}: FlightInfoProps) => (
  <Box
    sx={{
      '@media (max-width: 768px)': {
        backgroundColor: colors.white,
        padding: '1.2rem 1.2rem',
      },
    }}
  >
    <Stack spacing={16}>
      <Title order={3} size={18}>
        My flight details
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
          label="Date"
          placeholder="Flight date"
          minDate={new Date()}
          maw={400}
          w={270}
          disabled={loading}
          withAsterisk
          onClick={() => logAction(page, tags[0])}
          sx={{
            '@media (max-width: 768px)': {
              paddingBottom: '16px',
            },
          }}
          {...form?.getInputProps('departureDate')}
          styles={{
            day: {
              '&[data-weekend]': {
                color: colors.blue,
              },
            },
          }}
        />
        <InputLabel
          label="Flight number"
          placeholder="E.g. EZY123"
          withAsterisk
          disabled={loading}
          w={270}
          error={'invalid flight number'}
          {...form?.getInputProps('flightNumber')}
          isCapitalLetters={true}
          onClick={() => logAction(page, tags[1])}
        />
      </Flex>
    </Stack>
  </Box>
);

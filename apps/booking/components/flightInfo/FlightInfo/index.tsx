import { UseFormReturnType } from '@collinsonx/design-system/form';
import { Title, Stack, Flex, Box } from '@collinsonx/design-system/core';
import { DatePickerInput } from '@collinsonx/design-system/date';
import { IconCalendar } from '@tabler/icons-react';
import { InputLabel } from '@collinsonx/design-system';
import { ANALYTICS_TAGS } from '../../../constants';
import { logAction } from '@lib';
import useLocale from 'hooks/useLocale';

import classes from './FlightInfo.module.css';

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
}: FlightInfoProps) => {
  const translations = useLocale();

  return (
    <Box className={classes.container}>
      <Stack gap={16}>
        <Title order={3} size={18}>
          {translations.booking.flightDetails.title}
        </Title>
        <Flex className={classes.containerFlex} justify="space-between">
          <DatePickerInput
            leftSection={<IconCalendar size="1.5rem" stroke={1.5} />}
            label={translations.booking.flightDetails.dateInput.label}
            placeholder={
              translations.booking.flightDetails.dateInput.placeholder
            }
            minDate={new Date()}
            maw={400}
            w={270}
            disabled={loading}
            withAsterisk
            onClick={() => logAction(page, tags[0])}
            classNames={{ root: classes.datePickerInput, day: classes.day }}
            {...form?.getInputProps('departureDate')}
          />
          <InputLabel
            label={translations.booking.flightDetails.numberInput.label}
            placeholder={
              translations.booking.flightDetails.numberInput.placeholder
            }
            data-testid="flightNumber"
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
};

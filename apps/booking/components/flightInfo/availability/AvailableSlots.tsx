import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../../config/Constants';
import { formatDate } from '../../../utils/DateFormatter';
import { useMemo } from 'react';
import useLocale from 'hooks/useLocale';
import classes from './AvailableSlots.module.css';

interface AvailableSlotsProps {
  availableSlots: Availability;
  onSelectSlot: (value: string | null) => void;
  error?: string;
}
const AvailableSlots = ({
  availableSlots,
  onSelectSlot,
  error,
}: AvailableSlotsProps) => {
  const data = useMemo(
    () =>
      availableSlots.slots
        .map((slot) => {
          const startDate = formatDate(slot.startDate, TIME_FORMAT);
          const endDate = formatDate(slot.endDate, TIME_FORMAT);
          const label = ` ${startDate}-${endDate}`;
          const value = label;
          return {
            value,
            label,
          };
        })
        .reverse(),
    [availableSlots]
  );

  const translations = useLocale();

  return (
    <>
      <Select
        label=""
        placeholder={translations.booking.availableSlots.placeholder}
        data-testid="availableSlots"
        data={data}
        onChange={onSelectSlot}
        error={error}
        classNames={classes}
      />
    </>
  );
};

export default AvailableSlots;

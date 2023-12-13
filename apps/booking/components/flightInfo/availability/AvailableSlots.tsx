import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../../config/Constants';
import { formatDate } from '../../../utils/DateFormatter';
import { useMemo } from 'react';
import colors from 'ui/colour-constants';
import useLocale from 'hooks/useLocale';

interface AvailableSlotsProps {
  availableSlots: Availability;
  onSelectSlot: (value: string) => void;
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
        styles={{
          input: {
            borderRadius: 4,
            '&[data-invalid]': {
              borderColor: colors.red,
              '::placeholder': {
                color: colors.errorPlaceholder,
              },
            },
          },
        }}
      />
    </>
  );
};

export default AvailableSlots;

import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../../config/Constants';
import { formatDate } from '../../../utils/DateFormatter';
import { useMemo } from 'react';
import Heading from '@collinsonx/design-system/components/heading/Heading';

interface AvailableSlotsProps {
  availableSlots: Availability;
  onSelectSlot: (value: string) => void;
}
const AvailableSlots = ({
  availableSlots,
  onSelectSlot,
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

  return (
    <>
      <Select
        label=""
        placeholder="Select time"
        data={data}
        onChange={onSelectSlot}
      />
    </>
  );
};

export default AvailableSlots;

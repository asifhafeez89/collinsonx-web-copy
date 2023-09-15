import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../config/Constants';
import { formatDate, formatDateUTC } from '../../utils/DateFormatter';
import { useMemo } from 'react';

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
          const startDate = formatDateUTC(slot.startDate, TIME_FORMAT);
          const endDate = formatDateUTC(slot.endDate, TIME_FORMAT);
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

  const handleChange = (arrivalTime: string) => {
    onSelectSlot(arrivalTime);
  };

  return (
    <Select
      label="Estimated lounge arrival time"
      placeholder="Select time"
      data={data}
      onChange={handleChange}
    />
  );
};

export default AvailableSlots;

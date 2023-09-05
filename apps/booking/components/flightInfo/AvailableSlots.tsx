import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../config/Constants';
import { formatDate } from '../../utils/DateFormatter';

interface AvailableSlotsProps {
  availableSlots: Availability;
}
const AvailableSlots = ({ availableSlots }: AvailableSlotsProps) => {
  const data = availableSlots.slots.map((slot) => {
    const value = `${slot.startDate}-${slot.endDate}`;
    const startDate = formatDate(slot.startDate, TIME_FORMAT);
    const endDate = formatDate(slot.endDate, TIME_FORMAT);
    const label = ` ${startDate}-${endDate}`;
    return {
      value,
      label,
    };
  });
  return (
    <Select
      label="Available slots"
      placeholder="Select available slot"
      data={data}
    />
  );
};

export default AvailableSlots;

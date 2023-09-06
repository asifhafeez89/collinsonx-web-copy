import { Availability } from '@collinsonx/utils';
import { Select } from '@collinsonx/design-system/core';
import { TIME_FORMAT } from '../../config/Constants';
import { formatDate } from '../../utils/DateFormatter';

interface AvailableSlotsProps {
  availableSlots: Availability;
  onSelectSlot: (value: string) => void;
}
const AvailableSlots = ({
  availableSlots,
  onSelectSlot,
}: AvailableSlotsProps) => {
  const data = availableSlots.slots.map((slot) => {
    const startDate = formatDate(slot.startDate, TIME_FORMAT);
    const endDate = formatDate(slot.endDate, TIME_FORMAT);
    const label = ` ${startDate}-${endDate}`;
    const value = label;
    return {
      value,
      label,
    };
  });

  const handleChange = (arrivalTime: string) => {
    onSelectSlot(arrivalTime);
  };

  return (
    <Select
      label="*Estimated lounge arrival time"
      placeholder="Select time"
      data={data}
      onChange={handleChange}
    />
  );
};

export default AvailableSlots;

import { useState, useEffect } from 'React';
import { useQuery } from '@collinsonx/utils/apollo';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { Availability, Slots } from '@collinsonx/utils';
import { APIFlightInfo } from 'pages/api/flight';
import { Button, Text, Grid, Select } from '@collinsonx/design-system/core';
import dayjs from 'dayjs';

interface FlightInfoProps {
  flightInfo: APIFlightInfo;
  setLoadingOverlay: () => void;
}

const AvailableSlots = ({ flightInfo, setLoadingOverlay }: FlightInfoProps) => {
  const [availableSlots, setAvailableSlots] = useState<Array<Slots>>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slots>([]);
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const { loading, error, data } = useQuery<{
    getAvailableSlots: Availability;
  }>(getAvailableSlots, {
    variables: {
      data: {
        flightInformation: {
          type: 'DEPARTURE',
          dateTime: `${flightInfo?.departure?.date.local} ${flightInfo?.departure?.time.local}`,
          airport: flightInfo?.departure?.airport.iata,
          terminal: '-1',
        },
        guests: {
          adultCount: 5,
          childrenCount: 0,
          infantCount: 0,
        },
        product: {
          productType: 'Lounge',
          productID: '1139',
          supplierCode: '123',
        },
      },
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      setAvailableSlots(data.getAvailableSlots.slots);
    },
  });
  const onSelectSlot = (index: number) => {
    if (null != availableSlots) {
      setSelectedSlot(availableSlots[index]);
    }
  };

  interface AvailableSlotsSelectBoxProps {
    availableSlots: Array<Slots>;
  }

  const AvailableSlotsSelectBox = ({
    availableSlots,
  }: AvailableSlotsSelectBoxProps) => {
    const data = availableSlots.map((slot) => {
      const value = `${slot.startDate}-${slot.endDate}`;
      const startDate = dayjs(slot.startDate).format('hh:mm');
      const endDate = dayjs(slot.endDate).format('hh::mm');
      const label = ` ${startDate}-${endDate}`;

      return {
        value,
        label,
      };
    });
    setLoadingOverlay();
    return (
      <Select
        label="Available slots"
        placeholder="Select available slot"
        data={data}
      />
    );
  };

  return (
    <div>
      <Grid grow>
        {availableSlots.length > 0 && (
          <AvailableSlotsSelectBox availableSlots={availableSlots} />
        )}
      </Grid>
    </div>
  );
};
export default AvailableSlots;

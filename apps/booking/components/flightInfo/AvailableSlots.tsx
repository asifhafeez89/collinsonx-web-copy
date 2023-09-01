import { useState, useEffect } from 'react';
import { useQuery } from '@collinsonx/utils/apollo';
import getAvailableSlots from '@collinsonx/utils/queries/getAvailableSlots';
import { Availability, Slots, FlightDetails } from '@collinsonx/utils';
import { APIFlightInfo } from 'pages/api/flight';
import { Button, Text, Grid, Select } from '@collinsonx/design-system/core';
import dayjs from 'dayjs';
import { TRAVEL_TYPE, LOUNGE, TIME_FORMAT } from '../../config/Constants';
import { formatDate } from '../../utils/DateFormatter';

interface FlightInfoProps {
  flightInfo: FlightDetails;
  setLoadingOverlay: () => void;
  numberOfGuests: number;
}

const AvailableSlots = ({
  flightInfo,
  setLoadingOverlay,
  numberOfGuests,
}: FlightInfoProps) => {
  const [availableSlots, setAvailableSlots] = useState<Array<Slots>>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slots>();
  const [flightInfoLoading, setFlightInfoLoading] = useState(false);
  const { loading, error, data } = useQuery<{
    getAvailableSlots: Availability;
  }>(getAvailableSlots, {
    variables: {
      data: {
        flightInformation: {
          type: TRAVEL_TYPE,
          dateTime: flightInfo?.departure?.dateTime?.local,
          airport: flightInfo?.departure?.airport,
          terminal: '-1',
        },
        guests: {
          adultCount: numberOfGuests,
          childrenCount: 0,
          infantCount: 0,
        },
        product: {
          productType: LOUNGE,
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
      const startDate = formatDate(slot.startDate, TIME_FORMAT);
      const endDate = formatDate(slot.endDate, TIME_FORMAT);
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

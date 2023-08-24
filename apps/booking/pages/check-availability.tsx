import Layout from '@components/Layout';
import { useState } from 'react';
import { AvailabilitySlot, FlightInfo } from '../components/FlightInfo';
import { Stack } from '@collinsonx/design-system/core';
import { Breadcramp } from '@collinsonx/design-system';

interface MainProps {
  consumerNumber: string | string[];
  tempBearerToken: string | string[];
}
interface DepartureFlightInfo {
  airport: { iata: string };
  date: { local: string; utc: string };
  terminal: string;
  time: { local: string; utc: string };
}

interface FlightInfo {
  departure: DepartureFlightInfo;
  arrival: DepartureFlightInfo;
}

const CheckAvailability = () => {
  const [flightData, setFlightData] = useState<FlightInfo>();
  const [selectedSlot, setSelectedSlot] = useState<AvailabilitySlot>();
  const [selectedGuests, setSelectedGuests] = useState<AvailabilitySlot>();

  const onFlightInfoSuccess = (flightInfo: FlightInfo) => {
    setFlightData(flightInfo);
  };

  const onSetSelectedSlot = (selectedSlot: AvailabilitySlot) => {
    setSelectedSlot(selectedSlot);
  };

  return (
    <Layout>
      <Stack sx={{ width: '100%' }}>
        <Breadcramp title="Back to Gatwick" url="https://bbc.co.uk" />
      </Stack>
      <FlightInfo
        onSuccess={onFlightInfoSuccess}
        onSetSelectedSlot={onSetSelectedSlot}
      />
    </Layout>
  );
};

export default CheckAvailability;

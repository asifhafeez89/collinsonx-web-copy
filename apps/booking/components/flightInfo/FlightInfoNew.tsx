import AvailableSlots from './AvailableSlots';
import { APIFlightInfo } from 'pages/api/flight';
import { useState } from 'react';
interface FlightInfoProps {
  flightInfo: APIFlightInfo;
  setLoadingOverlay: () => void;
  numberOfGuests: number;
}
const FlightInfoNew = ({
  flightInfo,
  setLoadingOverlay,
  numberOfGuests,
}: FlightInfoProps) => {
  return (
    <AvailableSlots
      flightInfo={flightInfo}
      setLoadingOverlay={setLoadingOverlay}
      numberOfGuests={numberOfGuests}
    ></AvailableSlots>
  );
};

export default FlightInfoNew;

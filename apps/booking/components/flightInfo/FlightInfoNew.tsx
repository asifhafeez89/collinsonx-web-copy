import AvailableSlots from './AvailableSlots';
import { APIFlightInfo } from 'pages/api/flight';
import { useState } from 'react';
interface FlightInfoProps {
  flightInfo: APIFlightInfo;
  setLoadingOverlay: () => void;
}
const FlightInfoNew = ({ flightInfo, setLoadingOverlay }: FlightInfoProps) => {
  return (
    <AvailableSlots
      flightInfo={flightInfo}
      setLoadingOverlay={setLoadingOverlay}
    ></AvailableSlots>
  );
};

export default FlightInfoNew;

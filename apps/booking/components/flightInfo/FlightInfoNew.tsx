import AvailableSlots from './AvailableSlots';
import { APIFlightInfo } from 'pages/api/flight';
import { useState } from 'react';
import { FlightDetails, Slots } from '@collinsonx/utils';
interface FlightInfoProps {
  flightInfo: FlightDetails;
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

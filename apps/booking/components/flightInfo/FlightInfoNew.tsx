import AvailableSlots from './AvailableSlots';
import { APIFlightInfo } from 'pages/api/flight';
import { useState } from 'react';
interface FlightInfoProps {
  flightInfo: APIFlightInfo;
}
const FlightInfoNew = ({ flightInfo }: FlightInfoProps) => {
  return <AvailableSlots flightInfo={flightInfo}></AvailableSlots>;
};

export default FlightInfoNew;

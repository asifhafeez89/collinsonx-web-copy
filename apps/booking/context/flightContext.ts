import { FlightDetails } from '@collinsonx/utils';
import { createContext } from 'react';

interface FlightContextProps {
  setFlight: (flight: FlightDetails) => void;
  getFlight: () => FlightDetails;
}

const defaultContext = {
  setFlight: (flight: FlightDetails) => {
    sessionStorage.setItem('flightdetail', JSON.stringify(flight));
  },
  getFlight: () => {
    return JSON.parse(sessionStorage.getItem('flightdetail') ?? '{}');
  },
};

export const FlightContext = createContext<FlightContextProps>(defaultContext);

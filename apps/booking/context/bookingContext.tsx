import React, { ReactElement, ReactNode, createContext, useState } from 'react';

export interface Booking {
  bookingId?: string;
  flightNumber: string;
  departureDate?: Date | null;
  carrierCode?: string;
  adults: number;
  children: number;
  arrivalTime?: string;
  infants: number;
  arrival?: string;
}

interface BookingContextProps {
  setBooking: (booking: Booking) => void;
  getBooking: () => Booking;
}

const defaultContext = {
  setBooking: (booking: Booking) => {
    sessionStorage.setItem('bookingdetail', JSON.stringify(booking));
  },
  getBooking: () => {
    return JSON.parse(sessionStorage.getItem('bookingdetail') ?? '{}');
  },
};

export const BookingContext =
  createContext<BookingContextProps>(defaultContext);

interface BookingProviderProps {
  children: ReactNode;
}

const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <BookingContext.Provider value={defaultContext}>
      {children}
    </BookingContext.Provider>
  );
};

export default BookingProvider;

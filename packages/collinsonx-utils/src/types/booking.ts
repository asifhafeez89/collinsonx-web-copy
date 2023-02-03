import { LoungeData } from './lounge';

export enum BookingState {
  PENDING = 'Booking pending',
  DECLINED = 'Booking declined',
  CONFIRMED = 'Booking confirmed',
}

export type BookingData = {
  lounge: LoungeData;
  bookingState: BookingState;
  reservationDate: Date;
  additionalRequests?: string;
};

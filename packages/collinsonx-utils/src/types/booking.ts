export enum BookingState {
  PENDING = 'Booking pending',
  DECLINED = 'Booking declined',
  CONFIRMED = 'Booking confirmed',
}

export type BookingData = {
  id: string;
  loungeId: string;
  bookingState: BookingState;
  reservationDate: Date;
  additionalRequests?: string;
};

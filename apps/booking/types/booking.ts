export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

export const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

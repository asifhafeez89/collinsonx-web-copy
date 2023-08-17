export enum BookingType {
  Reservation = 'RESERVATION',
  WalkUp = 'WALK_UP',
}

const bookingTypeMap = {
  [BookingType.Reservation]: 'Reservation',
  [BookingType.WalkUp]: 'Walk-up',
};

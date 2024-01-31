import { Booking } from '@collinsonx/utils';

export const guestBooking = (booking: Booking) => {
  return {
    adults: booking.guestAdultCount,
    children: booking.guestChildrenCount,
    infants: booking.guestInfantCount,
  };
};

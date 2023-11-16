import { Booking } from '@collinsonx/utils';

import { Booking as BookingContext } from '../context/bookingContext';

export const guestBooking = (booking: Booking) => {
  return {
    adults: booking.guestAdultCount,
    children: booking.guestChildrenCount,
    infants: booking.guestInfantCount,
  };
};

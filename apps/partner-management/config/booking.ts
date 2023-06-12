import { BookingStatus } from '@collinsonx/utils';

const { Pending, Confirmed, Declined, CheckedIn, Cancelled } = BookingStatus;

export type PageType = 'pending' | 'confirmed' | 'declined';

export type BookingType = {
  color: string;
  description: string;
};

export const bookingConfig: Record<BookingStatus[number], BookingType> = {
  [Pending]: { color: '#FFF3BF', description: 'Booking pending' },
  [Confirmed]: { color: '#E9FAC8', description: 'Booking confirmed' },
  [CheckedIn]: { color: '#E9FAC8', description: 'Booking confirmed' },
  [Declined]: { color: '#FFE3E3', description: 'Booking declined' },
  [Cancelled]: { color: '#FFE3E3', description: 'Booking cancelled' },
};

export const bookingPageConfig: Record<PageType, BookingType> = {
  pending: bookingConfig[Pending],
  confirmed: bookingConfig[Confirmed],
  declined: bookingConfig[Declined],
};

import { Booking, BookingStatus } from '../generatedTypes/graphql';

export const getBookingsByType = (
  data: Booking[],
  type?: BookingStatus
): Booking[] | Record<BookingStatus, Booking[]> => {
  const result = data.reduce((prev, cur: Booking) => {
    prev[cur.status] = prev[cur.status] || [];
    prev[cur.status].push(cur);
    return prev;
  }, {} as Record<BookingStatus, Booking[]>);
  if (type) {
    return result[type] ?? [];
  }
  return result;
};

import { Booking, BookingStatus } from '../generatedTypes/graphql';

export const getBookingsByType = (
  data: Booking[],
  type?: BookingStatus[]
): Booking[] | Record<BookingStatus, Booking[]> => {
  const bookingStatusMap = data.reduce((prev, cur: Booking) => {
    prev[cur.status] = prev[cur.status] || [];
    prev[cur.status].push(cur);
    return prev;
  }, {} as Record<BookingStatus, Booking[]>);
  if (type && type.length) {
    return type.reduce((prev, cur) => {
      return prev.concat(bookingStatusMap[cur] || []);
    }, [] as Booking[]);
  }
  return bookingStatusMap;
};

const port = process.env.APP_PORT || 3000;

const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  `http://localhost:${port}`;

export const getItem = (key: string): string | null => {
  return sessionStorage.getItem(`${domain}_${key}`);
};

export const setItem = (key: string, value: string) => {
  return sessionStorage.setItem(`${domain}_${key}`, value);
};
export const removeItem = (key: string) => {
  return sessionStorage.removeItem(`${domain}_${key}`);
};

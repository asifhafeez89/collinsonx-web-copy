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

export const getItem = (key: string): string | null => {
  return sessionStorage.getItem(key);
};

export const setItem = (key: string, value: string) => {
  return sessionStorage.setItem(key, value);
};
export const removeItem = (key: string) => {
  return sessionStorage.removeItem(key);
};

export const cookieStringToObject = (cookieString: string) => {
  const str = cookieString.split('; ');
  const result: Record<string, string> = {};
  for (let i in str) {
    const cur = str[i].split('=');
    result[cur[0]] = cur[1].replace(';expires', '');
  }
  return result;
};

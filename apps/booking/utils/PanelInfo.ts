import { TIME_FORMAT, DATE_READABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';

export const InfoPanel = (
  departureDate: string | Date,
  flightNumber: string,
  translations: {
    date: string;
    flightTime: string;
    flightNumber: string;
  },
  locale?: string
) => [
  {
    header: translations.date,
    description: formatDate(
      new Date(`${departureDate}`),
      DATE_READABLE_FORMAT,
      locale
    ),
  },
  {
    header: translations.flightTime,
    description: formatDate(new Date(`${departureDate}`), TIME_FORMAT),
  },
  {
    header: translations.flightNumber,
    description: flightNumber,
  },
];

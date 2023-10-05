import { TIME_FORMAT, DATE_REDABLE_FORMAT } from '../config/Constants';
import { formatDate, formatDateUTC } from '../utils/DateFormatter';

export const InfoPanel = (
  departureDate: string | Date,
  flightNumber: string
) => [
  {
    header: 'Day of flight',
    description: formatDate(new Date(`${departureDate}`), DATE_REDABLE_FORMAT),
  },
  {
    header: 'Time of flight',
    description: formatDateUTC(new Date(`${departureDate}`), TIME_FORMAT),
  },
  {
    header: 'Flight number',
    description: flightNumber,
  },
];

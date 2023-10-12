import { TIME_FORMAT, DATE_READABLE_FORMAT } from '../config/Constants';
import { formatDate } from '../utils/DateFormatter';

export const InfoPanel = (
  departureDate: string | Date,
  flightNumber: string
) => [
  {
    header: 'Date:',
    description: formatDate(new Date(`${departureDate}`), DATE_READABLE_FORMAT),
  },
  {
    header: 'Time of flight:',
    description: formatDate(new Date(`${departureDate}`), TIME_FORMAT),
  },
  {
    header: 'Flight number:',
    description: flightNumber,
  },
];

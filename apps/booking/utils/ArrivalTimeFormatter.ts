import { formatDate } from './DateFormatter';
import { TIME_FORMAT } from 'config/Constants';

export const arrivalTimeFormatter = (
  bookedFrom: string | undefined,
  lastArrival: string | undefined
) =>
  `${formatDate(new Date(`${bookedFrom}`), TIME_FORMAT)}
  -
  ${formatDate(new Date(`${lastArrival}`), TIME_FORMAT)}`;

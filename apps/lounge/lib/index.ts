import dayjs from 'dayjs';
import { LOUNGE_HOURS_OFFSET } from 'config/lounge';

export const getLoungeArrivalTime = (date: Date): string =>
  dayjs(date).subtract(LOUNGE_HOURS_OFFSET, 'hours').format('HH:mm');

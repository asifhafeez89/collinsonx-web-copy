import { LOUNGE_HOURS_OFFSET } from 'config/lounge';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';

export const getLoungeArrivalTime = (date: Date): string =>
  dayjsTz(date).subtract(LOUNGE_HOURS_OFFSET, 'hours').format('HH:mm');

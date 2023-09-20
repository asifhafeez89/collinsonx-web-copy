import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import dayjs from 'dayjs';

export function formatDateUTC(dateval: Date, formattype: string): string {
  return dayjsTz(dateval).utc().format(formattype);
}
export function formatDate(dateval: Date, formattype: string): string {
  dayjs.locale('en');
  return dayjs(dateval).format(formattype);
}

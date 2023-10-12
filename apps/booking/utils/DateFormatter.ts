import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import dayjs from 'dayjs';

export function formatDateUTC(dateval: Date, formattype: string): string {
  return dayjsTz(dateval).utc().format(formattype);
}
export function formatDate(
  dateval: Date,
  formattype: string,
  timeZoneDifference?: number
): string {
  dayjs.locale('en');
  if (timeZoneDifference) {
    return dayjs(dateval).utcOffset(timeZoneDifference).format(formattype);
  }
  return dayjs(dateval).format(formattype);
}

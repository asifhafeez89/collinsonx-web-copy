import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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

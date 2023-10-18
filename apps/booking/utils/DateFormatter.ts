import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function formatDateUTC(
  dateval: Date,
  formattype: string,
  timeZoneDifference: number
): string {
  return dayjs.utc(dateval).utcOffset(timeZoneDifference).format(formattype);
}
export function formatDate(dateval: Date, formattype: string): string {
  dayjs.locale('en');
  return dayjs(dateval).format(formattype);
}

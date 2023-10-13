import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function formatDateUTC(
  dateval: Date,
  formattype: string,
  timeZoneDifference?: number
): string {
  if (timeZoneDifference) {
    return dayjs.utc(dateval).utcOffset(timeZoneDifference).format(formattype);
  }
  return dayjs(dateval).utc().format(formattype);
}
export function formatDate(dateval: Date, formattype: string): string {
  dayjs.locale('en');
  return dayjs(dateval).format(formattype);
}

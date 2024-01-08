import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { DATE_TIME_FORMAT } from 'config/Constants';
import 'dayjs/locale/es';
dayjs.extend(utc);
dayjs.extend(timezone);

export function formatDate(
  dateval: Date,
  formattype: string,
  locale?: string
): string {
  dayjs.locale(locale ? locale : 'en');
  return dayjs(dateval).format(formattype);
}

export function formatTimezone(localTimeHour: string, timezone: string) {
  return dayjs.tz(localTimeHour, timezone).format(DATE_TIME_FORMAT);
}

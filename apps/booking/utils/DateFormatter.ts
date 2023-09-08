import dayjs from 'dayjs';
export function formatDate(dateval: Date, formattype: string): string {
  dayjs.locale('en');
  return dayjs(dateval).format(formattype);
}

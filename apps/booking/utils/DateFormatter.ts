import dayjs from 'dayjs';
export function formatDate(dateval: Date, formattype: string): string {
  return dayjs(dateval).format(formattype);
}

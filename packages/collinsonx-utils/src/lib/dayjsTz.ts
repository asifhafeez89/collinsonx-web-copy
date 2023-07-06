import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/uk';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('uk');
dayjs.tz.setDefault('Europe/London');

const dayjsTz = (...args: any[]) => {
  return dayjs(...args).tz();
};

const timezonedUnix = (value: number) => {
  return dayjs.unix(value).tz();
};

dayjsTz.unix = timezonedUnix;
dayjsTz.duration = (dayjs as any).duration;

export default dayjsTz;

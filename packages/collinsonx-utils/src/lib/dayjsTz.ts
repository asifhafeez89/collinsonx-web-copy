import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/fr';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.locale('fr');
dayjs.tz.setDefault('Europe/Paris');

const dayjsTz = (...args: any[]) => {
  return dayjs(...args).tz();
};

const timezonedUnix = (value: number) => {
  return dayjs.unix(value).tz();
};

dayjsTz.unix = timezonedUnix;
dayjsTz.duration = (dayjs as any).duration;

export default dayjsTz;

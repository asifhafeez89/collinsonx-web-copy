import dayjs from 'dayjs';

/**
 * Time extraction utility based on dayjs library.
 * dayjs treats undefined as current date and this utility
 * contains an explicit check, for rendering purposes.
 *
 * @param item
 * @returns
 */
const getTime = (item: any) =>
  dayjs(item).isValid() && item !== undefined
    ? dayjs(item).format('HH:mm')
    : item ?? '-';

export default getTime;

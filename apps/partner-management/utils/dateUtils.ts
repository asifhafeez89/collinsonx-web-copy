import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

// Extend dayjs with the necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Formats a date string into a specified format.
 * @param dateString The date string to format.
 * @param formatString The format to apply. Default is 'DD MMM YYYY HH:mm [GMT]'.
 * @param timeZone The time zone to use for formatting. Default is 'GMT'.
 * @returns The formatted date string or an error message if the input is invalid.
 */
export function formatDateString(
  dateString: string,
  formatString: string = 'DD MMM YYYY HH:mm [GMT]',
  timeZone: string = 'GMT'
): string {
  try {
    const date = dayjs(dateString);
    if (!date.isValid()) {
      return '';
    }

    return date.tz(timeZone).format(formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

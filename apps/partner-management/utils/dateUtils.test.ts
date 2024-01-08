import { formatDateString } from './dateUtils';
import dayjs from 'dayjs';

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('formatDateString', () => {
  it('should correctly format a valid date string', () => {
    const input = '2021-12-25T00:00:00Z';
    const expected = '25 Dec 2021 00:00 GMT';
    expect(formatDateString(input)).toBe(expected);
  });

  it('should return an empty string for an invalid date string', () => {
    const input = 'invalid-date';
    expect(formatDateString(input)).toBe('');
  });

  it('should correctly apply a custom format string', () => {
    const input = '2021-12-25T00:00:00Z';
    const format = 'YYYY-MM-DD';
    const expected = '2021-12-25';
    expect(formatDateString(input, format)).toBe(expected);
  });

  it('should correctly format date in a different time zone', () => {
    const input = '2021-12-25T00:00:00Z';
    const timeZone = 'America/New_York';
    const expected = dayjs(input)
      .tz(timeZone)
      .format('DD MMM YYYY HH:mm [GMT]');
    expect(formatDateString(input, undefined, timeZone)).toBe(expected);
  });

  it('should use default format and time zone when not provided', () => {
    const input = '2021-12-25T00:00:00Z';
    const expected = dayjs(input).tz('GMT').format('DD MMM YYYY HH:mm [GMT]');
    expect(formatDateString(input)).toBe(expected);
  });
});

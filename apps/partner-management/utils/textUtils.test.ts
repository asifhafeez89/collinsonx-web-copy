import { toTitleCase } from './textUtils';

describe('toTitleCase', () => {
  it('should capitalize the first letter of a lowercase string', () => {
    const input = 'test string';
    const expected = 'Test string';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should not alter a string that is already capitalized', () => {
    const input = 'Test string';
    const expected = 'Test string';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should return an empty string when provided an empty string', () => {
    const input = '';
    const expected = '';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should correctly capitalize a string that starts with a special character', () => {
    const input = '@example';
    const expected = '@example';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should correctly capitalize a string that starts with a number', () => {
    const input = '1st place';
    const expected = '1st place';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should handle undefined', () => {
    const input = undefined;
    const expected = '';
    expect(toTitleCase(input)).toBe(expected);
  });

  it('should handle null', () => {
    const input = null;
    const expected = '';
    expect(toTitleCase(input)).toBe(expected);
  });
});

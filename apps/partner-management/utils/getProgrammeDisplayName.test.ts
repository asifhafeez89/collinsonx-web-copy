import { getProgrammeDisplayName } from './getProgrammeDisplayName';

describe('getProgrammeDisplayName', () => {
  it('should return a programme display name if it is supported', () => {
    const input = 'LK';
    const expected = 'LoungeKey';
    expect(getProgrammeDisplayName(input)).toBe(expected);
  });

  it('should return the programme code if programme is not supported', () => {
    const input = 'not-supported-programme';
    const expected = 'not-supported-programme';
    expect(getProgrammeDisplayName(input)).toBe(expected);
  });
});

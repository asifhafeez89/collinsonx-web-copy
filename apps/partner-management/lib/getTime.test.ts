import getTime from './getTime';
describe('getTime', () => {
  it("should return '-' when undefined", () => {
    expect(getTime(undefined)).toBe('-');
  });
  it("should return '-' when null", () => {
    expect(getTime(null)).toBe('-');
  });
  it('should return the exact value for everything else', () => {
    expect(getTime('10:20')).toBe('10:20');
  });
});

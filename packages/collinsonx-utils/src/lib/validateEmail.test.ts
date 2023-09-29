import validateEmail from './validateEmail';

describe('validateEmail', () => {
  it("should accept 'foo@bar.com' as email", () => {
    expect(validateEmail('foo@bar.com')).toBe(true);
  });
  it("should accept 'foo@bar.pics' as email", () => {
    expect(validateEmail('foobar')).toBe(false);
  });
  it("should accept 'foo+1@bar.com' as email", () => {
    expect(validateEmail('foobar')).toBe(false);
  });
  it("should not accept 'foobar' as email", () => {
    expect(validateEmail('foobar')).toBe(false);
  });
  it("should not accept 'foo@bar' as email", () => {
    expect(validateEmail('foobar')).toBe(false);
  });
});

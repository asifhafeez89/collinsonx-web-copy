import { render } from '@testing-library/react';
import { GuestCount } from './GuestCount';

describe(GuestCount, () => {
  it('display the correct number of guests', () => {
    const { getByTestId } = render(
      <GuestCount guestList={{ adults: 3, children: 2, infants: 1 }} />
    );
    const adultValue = getByTestId('adults').textContent;
    const childrenValue = getByTestId('children').textContent;
    const infantsValue = getByTestId('infants').textContent;

    expect(adultValue).toEqual(String(3));
    expect(childrenValue).toEqual(String(2));
    expect(infantsValue).toEqual(String(1));
  });
});

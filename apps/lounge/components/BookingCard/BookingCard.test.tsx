import React from 'react';
import { render } from '@testing-library/react';
import BookingCard from './BookingCard';
import { BookingStatus } from '@collinsonx/utils';

describe('BookingCard component test', () => {
  const props = {
    id: '1',
    name: 'Booking Test',
    location: 'London',
    imgUrl:
      'https://preview.redd.it/w3kr4m2fi3111.png?auto=webp&v=enabled&s=670db506318b4c312b529c49c50e8a8c8423be21',
    status: BookingStatus.Confirmed,
    date: '2023-05-09T10:00:00.000Z',
    bookedFrom: '2023-05-09T10:00:00.000Z',
    nextVisit: true,
    firstArray: true,
    onClick: jest.fn(),
  };

  it('renders correctly', () => {
    const { container } = render(<BookingCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

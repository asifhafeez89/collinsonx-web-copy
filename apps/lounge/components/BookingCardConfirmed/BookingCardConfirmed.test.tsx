import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import BookingCardConfirmed, {
  BookingCardConfirmedProps,
} from './BookingCardConfirmed';
let BookingCardProps: BookingCardConfirmedProps;

describe('BookingEmptyState component test', () => {
  beforeEach(() => {
    BookingCardProps = {
      name: 'User Name',
      location: 'London',
      date: '15 May 2023',
      status: 'Confirmed',
    };
  });
  it('component renders correctly', () => {
    const container = render(<BookingCardConfirmed {...BookingCardProps} />);
    expect(screen.getByText('Date')).toBeInTheDocument();
  });
});

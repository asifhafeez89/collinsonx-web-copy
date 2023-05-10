import React from 'react';
import BookingBadge from './BookingBadge';
import { BookingStatus } from '@collinsonx/utils';
import { bookingMap } from './BookingBadge';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('BookingCard component test', () => {
  const badgeProps = {
    status: BookingStatus.Confirmed,
    largeBadge: true,
  };

  xit('large badge renders correctly', () => {
    const { container } = render(<BookingBadge {...badgeProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  xit('checks if status text appears in the large badge', () => {
    const { container } = render(<BookingBadge {...badgeProps} />);
    expect(screen.getByText(bookingMap[badgeProps.status])).toBeInTheDocument();
  });

  it('small badge renders correctly', () => {
    badgeProps.largeBadge = false;
    const { container } = render(<BookingBadge {...badgeProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});

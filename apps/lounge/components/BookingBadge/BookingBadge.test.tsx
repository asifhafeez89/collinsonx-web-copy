import React from 'react';
import BookingBadge, { BadgeProps } from './BookingBadge';
import { BookingStatus } from '@collinsonx/utils';
import { bookingMap } from './BookingBadge';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let badgeProps: BadgeProps;

describe('BookingCard component test', () => {
  beforeEach(() => {
    badgeProps = {
      status: BookingStatus.Confirmed,
      largeBadge: true,
    };
  });

  it('large badge renders correctly', () => {
    const { container } = render(<BookingBadge {...badgeProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('checks if status text appears in the large badge', () => {
    render(<BookingBadge {...badgeProps} />);
    expect(screen.getByText(bookingMap[badgeProps.status])).toBeInTheDocument();
  });
});

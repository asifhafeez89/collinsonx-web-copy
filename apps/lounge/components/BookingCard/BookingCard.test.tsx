import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import dayjs from 'dayjs';
import '@testing-library/jest-dom';
import BookingCard from './BookingCard';
import { BookingStatus } from '@collinsonx/utils';

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

describe('BookingCard component test', () => {
  it('renders correctly', () => {
    const { container } = render(<BookingCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onClick when card is clicked', () => {
    render(<BookingCard {...props} />);
    const testElement = screen.getByText('View booking');
    fireEvent.click(testElement);
    expect(props.onClick).toHaveBeenCalledWith(props.id);
  });

  it('checks if card information is displayed', () => {
    render(<BookingCard {...props} />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.location)).toBeInTheDocument();
    expect(screen.getByText('9 May 2023')).toBeInTheDocument();
    expect(screen.getByText('10:00 lounge arrival time')).toBeInTheDocument();
  });

  it('checks for correct time formatting', () => {
    render(<BookingCard {...props} date="2023-05-09T14:00:00.000Z" />);
    expect(screen.getByText(props.name)).toBeInTheDocument();
    expect(screen.getByText(props.location)).toBeInTheDocument();
    expect(screen.getByText('9 May 2023')).toBeInTheDocument();
    expect(screen.getByText('14:00 lounge arrival time')).toBeInTheDocument();
  });
});

import { gql } from '../apollo';

const createBooking = gql`
  mutation CreateBooking($bookingInput: BookingInput) {
    createBooking(bookingInput: $bookingInput) {
      bookedFrom
      bookedTo
      consumerID
      createdAt
      id
      experienceID
      status
      updatedAt
    }
  }
`;

export default createBooking;

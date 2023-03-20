import { gql } from '../apollo';

const createBooking = gql`
  mutation CreateBooking($bookingInput: BookingInput) {
    createBooking(bookingInput: $bookingInput) {
      bookedFrom
      bookedTo
      consumer {
        id
      }
      id
      experience {
        id
      }
      status
      updatedAt
    }
  }
`;

export default createBooking;

import { gql } from '../apollo';

const deleteBooking = gql`
  mutation DeleteBooking($deleteBookingId: ID!) {
    deleteBooking(id: $deleteBookingId) {
      bookedTo
      bookedFrom
      consumer {
        id
      }
      createdAt
      status
      id
      experience {
        id
      }
      updatedAt
    }
  }
`;

export default deleteBooking;

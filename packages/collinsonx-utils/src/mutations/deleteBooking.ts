import { gql } from '../apollo';

const deleteBooking = gql`
  mutation DeleteBooking($deleteBookingId: ID!) {
    deleteBooking(id: $deleteBookingId) {
      bookedTo
      bookedFrom
      consumerID
      createdAt
      status
      id
      experienceID
      updatedAt
    }
  }
`;

export default deleteBooking;

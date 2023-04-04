import { gql } from '../apollo';

const cancelBooking = gql`
  mutation cancelBooking($cancelBookingId: ID!) {
    cancelBooking(id: $cancelBookingId) {
      bookedFrom
      bookedTo
      consumer {
        id
      }
      createdAt
      experience {
        id
      }
      id
      status
      updatedAt
    }
  }
`;

export default cancelBooking;

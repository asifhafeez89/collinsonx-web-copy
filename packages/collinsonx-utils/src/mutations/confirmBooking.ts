import { gql } from '../apollo';

const confirmBooking = gql`
  mutation ConfirmBooking($confirmBookingId: ID!) {
    confirmBooking(id: $confirmBookingId) {
      bookedFrom
      bookedTo
      createdAt
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

export default confirmBooking;

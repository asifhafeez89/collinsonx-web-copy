import { gql } from '../apollo';

const declineBooking = gql`
  mutation DeclineBooking($declineBookingId: ID!) {
    declineBooking(id: $declineBookingId) {
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

export default declineBooking;

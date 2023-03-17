import { gql } from '../apollo';

const declineBooking = gql`
  mutation DeclineBooking($declineBookingId: ID!) {
    declineBooking(id: $declineBookingId) {
      bookedFrom
      bookedTo
      consumerID
      createdAt
      experienceID
      id
      status
      updatedAt
    }
  }
`;

export default declineBooking;

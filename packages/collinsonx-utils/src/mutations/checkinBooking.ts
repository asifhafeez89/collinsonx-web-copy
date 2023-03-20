import { gql } from '../apollo';

const checkinBooking = gql`
  mutation CheckinBooking($checkinBookingId: ID!) {
    checkinBooking(id: $checkinBookingId) {
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

export default checkinBooking;

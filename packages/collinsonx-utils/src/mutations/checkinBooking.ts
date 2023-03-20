import { gql } from '../apollo';

const checkinBooking = gql`
  mutation CheckinBooking($checkinBookingId: ID!) {
    checkinBooking(id: $checkinBookingId) {
      bookedFrom
      bookedTo
      consumer {
        id
      }
      createdAt
      id
      status
      updatedAt
    }
  }
`;

export default checkinBooking;

import { gql } from '../apollo';

const getBookingsOverview = gql`
  query GetBookingsOverview($status: BookingStatus, $experienceId: ID!) {
    getBookings(status: $status, experienceID: $experienceId) {
      bookedFrom
    }
  }
`;

export default getBookingsOverview;

import { gql } from '../apollo';

const getBookings = gql`
  query Bookings {
    bookings {
      id
      additionalRequests
      bookingState
      reservationDate
      lounge {
        name
        location
        id
        images {
          url
          height
          width
        }
      }
    }
  }
`;

export default getBookings;

import { gql } from '../apollo';

const getBooking = gql`
  query Booking($id: String!) {
    booking(id: $id) {
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

export default getBooking;

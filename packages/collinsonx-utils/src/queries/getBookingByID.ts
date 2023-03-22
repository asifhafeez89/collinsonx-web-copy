import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingById($getBookingByIdId: ID!) {
    getBookingByID(id: $getBookingByIdId) {
      bookedFrom
      bookedTo
      experience {
        images {
          altText
          contentType
          height
          id
          url
          width
        }
        location
        name
        openingHours
      }
      id
    }
  }
`;

export default getBookingByID;

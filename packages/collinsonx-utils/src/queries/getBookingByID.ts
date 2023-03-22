import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingById($getBookingById: ID!) {
    getBookingByID(id: $getBookingById) {
      bookedFrom
      bookedTo
      experience {
        id
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
      status
      id
    }
  }
`;

export default getBookingByID;

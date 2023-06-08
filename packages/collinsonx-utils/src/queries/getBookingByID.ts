import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingById($getBookingById: ID!) {
    getBookingByID(id: $getBookingById) {
      bookedFrom
      bookedTo
      metadata
      consumer {
        fullName
        id
      }
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
        loungeName
        openingHours
      }
      status
      id
    }
  }
`;

export default getBookingByID;

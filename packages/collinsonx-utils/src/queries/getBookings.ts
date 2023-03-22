import { gql } from '../apollo';

const getBookings = gql`
  query GetBookings($experienceId: ID) {
    getBookings(experienceID: $experienceId) {
      bookedFrom
      bookedTo
      createdAt
      consumer {
        id
      }
      id
      experience {
        id
        name
        location
        images {
          url
        }
      }
      status
      updatedAt
    }
  }
`;

export default getBookings;

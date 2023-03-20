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
      }
      status
      updatedAt
    }
  }
`;

export default getBookings;

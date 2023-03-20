import { gql } from '../apollo';

const getBookings = gql`
  query GetBookings($experienceId: ID) {
    getBookings(experienceID: $experienceId) {
      bookedFrom
      bookedTo
      createdAt
      consumerID
      id
      experienceID
      status
      updatedAt
    }
  }
`;

export default getBookings;

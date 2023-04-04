import { gql } from '../apollo';
const getConsumerByID = gql`
  query GetConsumerByID($getConsumerById: ID!) {
    getConsumerByID(id: $getConsumerById) {
      bookings {
        id
        bookedFrom
        bookedTo
        status
        updatedAt
        createdAt
      }
      createdAt
      emailAddress
      id
      updatedAt
    }
  }
`;

export default getConsumerByID;

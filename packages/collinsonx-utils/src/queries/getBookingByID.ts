import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingByID($id: ID!) {
    getBookingByID(id: $id) {
      bookedTo
      bookedFrom
      consumerID
      id
      experienceID
      createdAt
      status
      updatedAt
    }
  }
`;

export default getBookingByID;

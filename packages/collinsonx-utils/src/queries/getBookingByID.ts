import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingByID($id: ID!) {
    getBookingByID(id: $id) {
      bookedTo
      bookedFrom
      consumer {
        id
      }
      id
      experience {
        id
      }
      createdAt
      status
      updatedAt
    }
  }
`;

export default getBookingByID;

import { gql } from '../apollo';

const getAllBookings = gql`
  query GetAllBookings {
    getAllBookings {
      bookedFrom
      bookedTo
      createdAt
      guestCount
      id
      status
      type
      updatedAt
      consumer {
        createdAt
        crmId
        emailAddress
        firstName
        fullName
        id
        updatedAt
      }
    }
  }
`;

export default getAllBookings;

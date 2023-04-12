import { gql } from '../apollo';

const getAllBookings = gql`
  query GetAllBookings {
    getAllBookings {
      bookedFrom
      bookedTo
      createdAt
      consumer {
        id
        firstName
        lastName
        fullName
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

export default getAllBookings;

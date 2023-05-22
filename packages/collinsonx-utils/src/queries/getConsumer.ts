import { gql } from '../apollo';

const getConsumer = gql`
  query GetConsumer {
    getConsumer {
      id
      crmId
      fullName
      firstName
      lastName
      emailAddress
      createdAt
      updatedAt
      bookings {
        bookedFrom
        bookedTo
        createdAt
        updatedAt
        experience {
          id
        }
      }
    }
  }
`;

export default getConsumer;

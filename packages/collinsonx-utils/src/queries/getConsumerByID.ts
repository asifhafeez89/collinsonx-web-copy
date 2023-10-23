import { gql } from '../apollo';
const getConsumerByID = gql`
  query GetConsumerByID($getConsumerById: ID!) {
    getConsumerByID(id: $getConsumerById) {
      linkedAccounts {
        membershipID
        membershipType
        provider
        updatedAt
        id
        createdAt
        analytics
        externalID
      }
      bookings {
        id
        bookedFrom
        bookedTo
        status
        updatedAt
        createdAt
      }
      firstName
      lastName
      dateOfBirth
      createdAt
      emailAddress
      id
      updatedAt
    }
  }
`;

export default getConsumerByID;

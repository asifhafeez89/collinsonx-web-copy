import { gql } from '../apollo';

const getConsumerByEmailAddress = gql`
  query GetConsumerByEmailAddress($emailAddress: String!) {
    getConsumerByEmailAddress(emailAddress: $emailAddress) {
      bookings {
        bookedFrom
        bookedTo
        id
        status
        updatedAt
      }
      createdAt
      emailAddress
      id
      updatedAt
    }
  }
`;

export default getConsumerByEmailAddress;

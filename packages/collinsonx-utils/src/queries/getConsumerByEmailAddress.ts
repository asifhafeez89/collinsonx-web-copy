import { gql } from '../apollo';

const getConsumerByEmailAddress = gql`
  query GetConsumerByEmailAddress($emailAddress: String!) {
    getConsumerByEmailAddress(emailAddress: $emailAddress) {
      id
    }
  }
`;

export default getConsumerByEmailAddress;

import { gql } from '../apollo';

const linkAccount = gql`
  mutation LinkAccount($linkedAccountInput: LinkedAccountInput) {
    linkAccount(linkedAccountInput: $linkedAccountInput) {
      id
      externalID
      consumer {
        id
        fullName
        firstName
        lastName
        dateOfBirth
        emailAddress
        phone
        crmId
        linkedAccounts {
          id
        }
        createdAt
        updatedAt
      }
      provider
      membershipID
      membershipType
      createdAt
      updatedAt
    }
  }
`;

export default linkAccount;

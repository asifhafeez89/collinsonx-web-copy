import { gql } from '../apollo';

const getInvitationTokenIsValid = gql`
  query GetInvitationTokenIsValuid($inviteToken: String!) {
    getInvitationTokenIsValid(inviteToken: $inviteToken)
  }
`;

export default getInvitationTokenIsValid;

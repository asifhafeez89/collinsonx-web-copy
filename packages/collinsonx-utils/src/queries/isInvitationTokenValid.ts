import { gql } from '../apollo';

const isInvitationTokenValid = gql`
  query IsInvitationTokenValid($inviteToken: String!) {
    isInvitationTokenValid(inviteToken: $inviteToken)
  }
`;

export default isInvitationTokenValid;

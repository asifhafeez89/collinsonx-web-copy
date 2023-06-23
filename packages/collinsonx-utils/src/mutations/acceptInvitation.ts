import { gql } from '../apollo';

const acceptInvitation = gql`
  mutation AcceptInvitation($acceptInvitationInput: AcceptInvitationInput!) {
    acceptInvitation(acceptInvitationInput: $acceptInvitationInput) {
      createdAt
      experience {
        id
      }
      expiresAt
      inviteeEmail
      updatedAt
      id
    }
  }
`;

export default acceptInvitation;

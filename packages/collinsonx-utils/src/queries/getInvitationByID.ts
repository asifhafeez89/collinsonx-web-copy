import { gql } from '../apollo';
const getInvitationByID = gql`
  query GetInvitationByID($getInvitationById: ID!) {
    getInvitationByID(id: $getInvitationById) {
      createdAt
      experience {
        id
      }
      id
      inviteeEmail
      updatedAt
    }
  }
`;

export default getInvitationByID;

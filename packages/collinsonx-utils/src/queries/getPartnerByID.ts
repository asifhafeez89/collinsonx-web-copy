import { gql } from '../apollo';
const getPartnerByID = gql`
  query GetPartnerByID($getPartnerById: ID!) {
    getPartnerByID(id: $getPartnerById) {
      experiences {
        id
        loungeName
        location {
          airportName
          terminal
        }
      }
      id
      lastName
      updatedAt
      firstName
      fullName
      createdAt
      emailAddress
    }
  }
`;

export default getPartnerByID;

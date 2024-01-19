import { gql } from '../apollo';

const getPartnerBrandByID = gql`
  query GetPartnerBrandByID($id: ID!) {
    getPartnerBrandByID(id: $id) {
      id
      name
      outlets {
        id
        category
        name
        legacyCode
        status
        location {
          name
          terminal
        }
        productCategories
        content {
          media {
            mainImage {
              url
            }
            mediaCollection {
              items {
                contentType
              }
            }
          }
        }
      }
    }
  }
`;

export default getPartnerBrandByID;

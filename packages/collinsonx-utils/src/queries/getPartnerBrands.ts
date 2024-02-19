import { gql } from '../apollo';

const getPartnerBrands = gql`
  query GetPartnerBrands($limit: Int) {
    getPartnerBrands(limit: $limit) {
      items {
        id
        name
        outlets {
          id
        }
      }
      totalItemCount
    }
  }
`;

export default getPartnerBrands;

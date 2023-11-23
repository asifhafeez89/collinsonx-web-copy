import { gql } from '../apollo';

const getPartnerBrands = gql`
  query GetPartnerBrands($limit: Int) {
    getPartnerBrands(limit: $limit) {
      id
      name
      outlets {
        id
      }
    }
  }
`;

export default getPartnerBrands;

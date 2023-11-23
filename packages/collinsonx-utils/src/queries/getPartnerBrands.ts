import { gql } from '../apollo';

const getPartnerBrands = gql`
  query GetPartnerBrands($limit: Int) {
    getPartnerBrands(limit: $limit) {
      id
    }
  }
`;

export default getPartnerBrands;

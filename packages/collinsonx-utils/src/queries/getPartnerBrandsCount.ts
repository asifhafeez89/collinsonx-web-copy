import { gql } from '../apollo';

const getPartnerBrands = gql`
  query GetPartnerBrandsCount($limit: Int) {
    getPartnerBrands(limit: $limit) {
      id
    }
  }
`;

export default getPartnerBrands;

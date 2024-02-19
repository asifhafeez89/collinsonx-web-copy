import { gql } from '../apollo';

const getPartnerBrandsCount = gql`
  query GetPartnerBrandsCount {
    getPartnerBrands {
      totalItemCount
    }
  }
`;

export default getPartnerBrandsCount;

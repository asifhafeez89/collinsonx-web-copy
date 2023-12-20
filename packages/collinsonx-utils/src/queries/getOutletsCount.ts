import { gql } from '../apollo';

const getOutletsCount = gql`
  query GetOutletsCount {
    getOutlets {
      totalItemCount
    }
  }
`;

export default getOutletsCount;

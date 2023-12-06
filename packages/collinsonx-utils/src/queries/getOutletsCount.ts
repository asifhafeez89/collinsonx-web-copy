import { gql } from '../apollo';

const getOutletsCount = gql`
  query GetOutletsCount($limit: Int) {
    getOutlets(limit: $limit) {
      id
    }
  }
`;

export default getOutletsCount;

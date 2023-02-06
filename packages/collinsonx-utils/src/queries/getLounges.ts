import { gql } from '../apollo';

export default gql`
  query Lounges {
    lounges {
      id
      name
      location
      images {
        url
      }
    }
  }
`;

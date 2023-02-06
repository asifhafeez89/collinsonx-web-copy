import { gql } from '../apollo';

export default gql`
  query getLoungesByName($loungeName: String!) {
    getLoungesByName(loungeName: $loungeName) {
      name
      location
      openingHours
      conditions
      facilities
      id
      images {
        url
        height
        width
      }
    }
  }
`;

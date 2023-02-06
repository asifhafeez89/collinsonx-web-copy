import { gql } from '../apollo';

const getLounge = gql`
  query Lounge($id: String!) {
    lounge(id: $id) {
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

export default getLounge;

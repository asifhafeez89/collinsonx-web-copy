import { gql } from '../apollo';

const getSearchExperiences = gql`
  query SearchExperiences($query: String) {
    searchExperiences(query: $query) {
      id
      name
      location
      facilities
      openingHours
      conditions
      images {
        altText
        url
        height
        width
        id
      }
    }
  }
`;
export default getSearchExperiences;

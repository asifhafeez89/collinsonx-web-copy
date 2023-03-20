import { gql } from '../apollo';

const getSearchExperiences = gql`
  query SearchExperiences($query: String) {
    searchExperiences(query: $query) {
      additionalInformation
      category
      conditions
      id
      directions
      facilities
      images {
        url
      }
      location
      name
      objectID
      openingHours
      operator {
        id
        name
      }
    }
  }
`;
export default getSearchExperiences;

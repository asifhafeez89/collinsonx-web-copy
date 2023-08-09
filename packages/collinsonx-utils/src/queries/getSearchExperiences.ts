import { gql } from '../apollo';

const getSearchExperiences = gql`
  query SearchExperiences($query: String) {
    searchExperiences(query: $query) {
      id
      loungeName
      location {
        terminal
      }
    }
  }
`;
export default getSearchExperiences;

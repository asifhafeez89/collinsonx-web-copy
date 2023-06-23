import { gql } from '../apollo';

const getExperienceByID = gql`
  query GetExperienceByID($getExperienceById: String) {
    getExperienceByID(id: $getExperienceById) {
      id
      loungeName
      loungeCode
      location {
        airportName
        airportCode
        terminal
        terminalCode
        country
        city
        region
        isoCountryCode
        lbCountryCode
      }
    }
  }
`;

export default getExperienceByID;

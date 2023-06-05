import { gql } from '../apollo';

const getBookings = gql`
  query GetBookings($experienceId: ID!) {
    getBookings(experienceID: $experienceId) {
      bookedFrom
      bookedTo
      createdAt
      type
      consumer {
        id
      }
      id
      experience {
        id
        loungeName
        images {
          url
        }
        location {
          airportCode
          airportName
          cgTerminal
          cgTerminalCode
          city
          country
          isoCountryCode
          lbCountryCode
          region
          terminal
          terminalCode
          terminalAccessibility
        }
      }

      status
      updatedAt
    }
  }
`;

export default getBookings;

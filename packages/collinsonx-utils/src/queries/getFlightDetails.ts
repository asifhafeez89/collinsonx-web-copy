import { gql } from '../apollo';

const getFlightDetails = gql`
  query GetFlightDetails($flightDetails: FlightDetailsInput!) {
    getFlightDetails(flightDetails: $flightDetails) {
      arrival {
        airport
        terminal
        dateTime {
          local
          utc
        }
      }
      departure {
        airport
        terminal
        dateTime {
          local
          utc
        }
      }
    }
  }
`;

export default getFlightDetails;

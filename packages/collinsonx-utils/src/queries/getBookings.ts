import { gql } from '../apollo';

const getBookings = gql`
  query GetBookings($status: BookingStatus, $experienceId: ID!) {
    getBookings(status: $status, experienceID: $experienceId) {
      bookedFrom
      bookedTo
      createdAt
      type
      metadata
      id
      reference
      guestCount
      status
      createdAt
      updatedAt
      consumer {
        createdAt
        crmId
        emailAddress
        firstName
        fullName
        id
        updatedAt
      }
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
    }
  }
`;

export default getBookings;

import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingById($getBookingById: ID!) {
    getBookingByID(id: $getBookingById) {
      bookedFrom
      bookedTo
      lastArrival
      metadata
      reference
      price
      price_currency
      guestAdultCount
      guestChildrenCount
      status
      id
      consumer {
        emailAddress
        fullName
        id
      }
      experience {
        loungeName
        openingHours
        id
        images {
          altText
          contentType
          height
          id
          url
          width
        }
        location {
          airportName
          terminal
        }
        pricing {
          currency
          reservationOnlyFee
          reservationCost
        }
      }
    }
  }
`;

export default getBookingByID;

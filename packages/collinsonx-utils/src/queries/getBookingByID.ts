import { gql } from '../apollo';

const getBookingByID = gql`
  query GetBookingById($getBookingById: ID!) {
    getBookingByID(id: $getBookingById) {
      actingAccount
      bookedFrom
      bookedTo
      lastArrival
      metadata
      reference
      price
      price_currency
      guestAdultCount
      guestChildrenCount
      guestInfantCount
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
      refundStatus
    }
  }
`;

export default getBookingByID;

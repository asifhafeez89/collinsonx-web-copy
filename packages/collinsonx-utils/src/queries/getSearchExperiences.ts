import { gql } from '../apollo';

const getSearchExperiences = gql`
  query SearchExperiences($query: String) {
    searchExperiences(query: $query) {
      additionalInformation
      conditions
      id
      directions
      facilities
      loungeName
      loungeCode
      accessPeriod
      airsideLandside
      hasActiveLounges
      passengerType
      ppboOperatorName
      serviceCentre
      uniqueValueKey
      pricing {
        pricingType
        currency
        reservationCost
        lifestyleXReservationCharge
        walkInCostCurrentPPRate
        lifestyleXWalkInCharge
        vat
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
      images {
        url
        altText
        height
        width
        id
      }
      openingHours
    }
  }
`;
export default getSearchExperiences;

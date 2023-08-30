import { gql } from '@apollo/client';

const getSearchExperiences = gql`
  query SearchExperiences($query: String) {
    searchExperiences(query: $query) {
      id
      loungeName
      loungeCode
      location {
        airportName
        city
        country
        terminal
      }
      pricing {
        pricingType
        currency
        reservationCost
        lifestyleXReservationCharge
        walkInCostCurrentPPRate
        lifestyleXWalkInCharge
        lifestyleXReservationCharge
        vat
      }
      facilities
      openingHours
      conditions
      directions
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

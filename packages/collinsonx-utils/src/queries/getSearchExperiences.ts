import { gql } from '@apollo/client';

const getSearchExperiences = gql`
  query SearchExperiences($query: String, $searchFilter: SearchFilterInput) {
    searchExperiences(query: $query, searchFilter: $searchFilter) {
      id
      loungeName
      loungeCode
      location {
        airportName
        airportCode
        city
        country
        terminal
        timezone
      }
      partnerIdProd
      partnerIdTest
      partnerIntegrationId
      pricing {
        pricingType
        currency
        reservationCost
        lifestyleXReservationCharge
        walkInCostCurrentPPRate
        lifestyleXWalkInCharge
        lifestyleXReservationCharge
        vat
        reservationOnlyFeeCost
        reservationOnlyFee
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

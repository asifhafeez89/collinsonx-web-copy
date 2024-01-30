import { gql } from '../apollo';

const getOutletByID = gql`
  query GetOutletByID($id: ID!) {
    getOutletByID(id: $id) {
      id
      name
      category
      code
      legacyCode
      location {
        city
        code
        country
        isoCountryCode
        landside
        name
        terminal
      }
      meta {
        editor {
          lastName
          firstName
          organisation
        }
        lastEdited
      }
      ancillaryProducts {
        tier
        costs {
          cost
          costCurrency
          programme
          defaultTaxPercentage
          projectedCost
          reservationCost
          type
        }
        salePrices {
          programme
          salePrice
          salePriceCurrency
          stripePriceID
        }
        name
        id
        salesforceID
        status
      }
      products {
        id
        name
        tier
        costs {
          cost
          costCurrency
          programme
          defaultTaxPercentage
          projectedCost
          reservationCost
          type
        }
        salePrices {
          programme
          salePrice
          salePriceCurrency
          stripePriceID
        }
        status
        category
        accessType
        salesforceID
        stage
      }
      openingTimes {
        meta {
          lastEdited
          editor {
            lastName
            firstName
            organisation
          }
        }
        exceptions
        schedules {
          MONDAY {
            endTime
            startTime
          }
          TUESDAY {
            endTime
            startTime
          }
          WEDNESDAY {
            endTime
            startTime
          }
          THURSDAY {
            endTime
            startTime
          }
          FRIDAY {
            endTime
            startTime
          }
          SATURDAY {
            endTime
            startTime
          }
          SUNDAY {
            endTime
            startTime
          }
        }
      }
      hasDisabledAccess
      tier
      productCategories
      content {
        media {
          mainImage {
            url
            description
            title
          }
          mediaCollection {
            items {
              url
              description
              title
            }
          }
        }
      }
      status
      salesforceID
      reservationEmail
      partnerBrand {
        name
      }
    }
  }
`;

export default getOutletByID;

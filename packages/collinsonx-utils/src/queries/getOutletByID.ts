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
      products {
        id
        name
        category
        status
      }
      openingTimes {
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

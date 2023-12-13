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
      tags
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

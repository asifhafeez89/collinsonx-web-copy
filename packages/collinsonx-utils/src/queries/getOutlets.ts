import { gql } from '../apollo';

const getOutlets = gql`
  query GetOutlets($limit: Int) {
    getOutlets(limit: $limit) {
      category
      id
      name
      legacyCode
      status
      location {
        name
        terminal
      }
      tags
      content {
        media {
          mainPicture {
            url
          }
          mediaCollection {
            items {
              contentType
            }
          }
        }
      }
    }
  }
`;

export default getOutlets;

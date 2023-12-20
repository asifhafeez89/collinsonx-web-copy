import { gql } from '../apollo';

const getOutlets = gql`
  query GetOutlets($page: Int, $pageSize: Int) {
    getOutlets(page: $page, pageSize: $pageSize) {
      items {
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
            mainImage {
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
      pageInfo {
        currentPage
        hasNextPage
        hasPreviousPage
        totalPages
      }
      totalItemCount
    }
  }
`;

export default getOutlets;

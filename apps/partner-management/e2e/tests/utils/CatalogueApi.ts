import axios from 'axios';
import Authenticate from 'e2e/tests/utils/Authenticate';
import { apiURL } from './config';
export default class CatalogueApi {
  async getSuperUserHeaders() {
    const authenticate = new Authenticate();
    const superUserAuthToken = await authenticate.asASuperUser();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${superUserAuthToken}`,
      'Content-Type': 'application/json',
    };

    return headers;
  }

  async getPartnerBrands(limit: number) {
    const query = `query GetPartnerBrands($limit: Int) {
      getPartnerBrands(limit: $limit) {
        id
        name
        outlets {
          id
        }
      }
    }`;

    const variables = {
      limit,
    };

    const request = {
      query,
      variables,
    };

    const headers = await this.getSuperUserHeaders();

    const response = await axios.post(apiURL, request, { headers });

    return response.data.data.getPartnerBrands;
  }

  async getPartnerBrandByID(id: string) {
    const query = `query GetPartnerBrandByID($id: ID!) {
      getPartnerBrandByID(id: $id) {
        id
        name
        outlets {
          id
          category
          name
          legacyCode
          status
          location {
            name
            terminal
          }
          productCategories
        }
      }
    }`;

    const variables = {
      id,
    };

    const request = {
      query,
      variables,
    };

    const headers = await this.getSuperUserHeaders();

    const response = await axios.post(apiURL, request, { headers });

    return response.data.data.getPartnerBrandByID;
  }

  async getOutletsCount(page?: number, pageSize?: number) {
    const pageQueryTypes =
      page && pageSize ? '($page: Int, $pageSize: Int)' : '';
    const pageQueryArgs =
      page && pageSize ? '(page: $page, pageSize: $pageSize)' : '';

    const query = `query GetOutlets${pageQueryTypes} {
      getOutlets${pageQueryArgs} {
        totalItemCount
      }
    }`;

    const variables =
      page && pageSize
        ? {
            page,
            pageSize,
          }
        : {};

    const request = {
      query,
      variables,
    };

    const headers = await this.getSuperUserHeaders();

    const response = await axios.post(apiURL, request, { headers });

    return response.data.data.getOutlets.totalItemCount;
  }

  async getOutlets(page?: number, pageSize?: number) {
    const pageQueryTypes =
      page && pageSize ? '($page: Int, $pageSize: Int)' : '';
    const pageQueryArgs =
      page && pageSize ? '(page: $page, pageSize: $pageSize)' : '';

    const query = `query GetOutlets${pageQueryTypes} {
      getOutlets${pageQueryArgs} {
        items {
          id
          name
          legacyCode
          location {
            terminal
            name
          }
        }
      }
    }`;

    const variables =
      page && pageSize
        ? {
            page,
            pageSize,
          }
        : {};

    const request = {
      query,
      variables,
    };

    const headers = await this.getSuperUserHeaders();

    const response = await axios.post(apiURL, request, { headers });

    return response.data.data.getOutlets.items;
  }
}

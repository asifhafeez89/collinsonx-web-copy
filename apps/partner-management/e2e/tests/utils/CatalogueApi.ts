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
          tags
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
}

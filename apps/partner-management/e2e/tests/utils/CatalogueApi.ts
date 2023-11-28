import axios from 'axios';
import Authenticate from 'e2e/tests/utils/Authenticate';
import { apiURL } from './config';

export default class CatalogueApi {
  async getPartnerBrands() {
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
      limit: 10,
    };

    const request = {
      query,
      variables,
    };

    const authenticate = new Authenticate();
    const superUserAuthToken = await authenticate.asASuperUser();

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${superUserAuthToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiURL, request, { headers });

    return response.data.data.getPartnerBrands;
  }
}

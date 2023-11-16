import StripeUtils from './stripe/StripeUtils';
import AlgoliaUtils from './algolia/AlgoliaUtils';
import PartnerUtils from './PartnerUtils';
import { v4 as uuidv4 } from 'uuid';
import { Request, APIRequestContext } from '@playwright/test';
import { StripeProduct } from '../types/StripeProduct';

class TestSetup {
  private request: APIRequestContext;
  private stripeUtils: StripeUtils | null;
  private algoliaUtils: AlgoliaUtils | null;
  experienceId: string;
  priceId: string | null | undefined;

  /**
   * @param {object} request - Playwright object used to send API requests.
   */
  constructor(request: APIRequestContext) {
    this.request = request;
    this.stripeUtils = null;
    this.algoliaUtils = null;
    this.experienceId = uuidv4();
    this.priceId = null;
  }

  /**
   * @description Setup Travel Experience data within Algolia and Stripe,
   * and create and associate a partner.
   */
  async setup() {
    this.stripeUtils = new StripeUtils(this.experienceId);

    await this.stripeUtils.createProductandPriceObject();

    this.priceId = this.stripeUtils.priceId?.toString();

    if (typeof this.priceId !== 'string') {
      throw new Error(
        'The Stripe priceId is not in the expected string format. The priceId may be null. As a result, the test setup could not be completed.'
      );
    }

    // Details from the created Stripe product are fed into Algolia
    const stripeProduct: StripeProduct = {
      experienceId: this.experienceId,
      walkUpPriceId: this.priceId,
      reservationPriceId: this.priceId,
    };

    this.algoliaUtils = new AlgoliaUtils(stripeProduct);

    const newLounge = this.algoliaUtils.createAlgoliaLoungeObj();

    await this.algoliaUtils.postLoungeToAlgolia(newLounge);

    const partner = new PartnerUtils(this.experienceId, this.request);

    const partnerDetails = await partner.signUp();

    return partnerDetails;
  }

  /**
   * @description Teardown Travel Experience data within Algolia and Stripe
   */
  async teardown() {
    await this.algoliaUtils?.deleteLoungeFromAlgolia();

    await this.stripeUtils?.setProductActiveStatus(false);
  }
}

export default TestSetup;

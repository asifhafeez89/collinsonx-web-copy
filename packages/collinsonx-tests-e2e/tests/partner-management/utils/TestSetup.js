import StripeUtils from './stripe/StripeUtils.js';
import AlgoliaUtils from './algolia/AlgoliaUtils.js';
import PartnerUtils from './PartnerUtils';
import { v4 as uuidv4 } from 'uuid';

class TestSetup {
  /**
   * @param {object} request - Playwright object used to send API requests.
   */
  constructor(request) {
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

    this.priceId = this.stripeUtils.priceId;

    // Details from the created Stripe product are fed into Algolia
    const stripeProduct = {
      experienceId: this.experienceId,
      walkUpPriceId: this.priceId,
      reservationPriceId: this.priceId,
    };

    this.algoliaUtils = new AlgoliaUtils(stripeProduct);

    const newLounge = this.algoliaUtils.createLoungeJSON();

    await this.algoliaUtils.postLoungeToAlgolia(newLounge);

    const partner = new PartnerUtils(this.experienceId, this.request);

    const partnerDetails = await partner.signUp();

    return partnerDetails;
  }

  /**
   * @description Teardown Travel Experience data within Algolia and Stripe
   */
  async teardown() {
    await this.algoliaUtils.deleteLoungeFromAlgolia();

    await this.stripeUtils.setProductActiveStatus(false);
  }
}

export default TestSetup;

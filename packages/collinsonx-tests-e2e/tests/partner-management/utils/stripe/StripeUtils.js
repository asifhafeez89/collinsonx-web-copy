import { v4 as uuidv4 } from 'uuid';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_API_KEY);

class StripeUtils {
  constructor(experienceId) {
    this.productId = `prod_TESTAUTO${uuidv4()}`;
    this.experienceId = experienceId;
    this.priceId = null;
  }

  async createProductandPriceObject() {
    const createdProduct = await this.createProduct();
    this.priceId = createdProduct.default_price;

    await this.updateMetaDataForPriceObject();
  }

  async createProduct() {
    const response = await stripe.products.create({
      id: this.productId,
      name: 'Automation Tests Lounge',
      default_price_data: {
        currency: 'gbp',
        unit_amount: 10000,
      },
      metadata: {
        internalProductId: this.experienceId,
        isForAutomationTesting: 'true',
      },
    });

    return response;
  }

  /**
   * @description Update the default price object (created on product creation) to include the internalProductId (experienceId)
   * as metadata
   * @returns updated price object
   */
  async updateMetaDataForPriceObject() {
    // current stripe logic required the internalProductId metadata to be on both the product and price objects
    const response = await stripe.prices.update(this.priceId, {
      metadata: {
        internalProductId: this.experienceId,
        isForAutomationTesting: 'true',
      },
    });

    return response;
  }

  /**
   *
   * @param {boolean} boolean - whether to make the product active or inactive
   * @returns updated product object
   */
  async setProductActiveStatus(boolean) {
    const response = await stripe.products.update(this.productId, {
      active: boolean,
    });
    return response;
  }
}

export default StripeUtils;

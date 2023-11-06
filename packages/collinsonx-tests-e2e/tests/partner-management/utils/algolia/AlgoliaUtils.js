import algoliasearch from 'algoliasearch';
import loungeTemplateObj from './loungeTemplateObj.js';

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_WRITE_API_KEY
);
const index = client.initIndex('test_experiences');

/**
 * Create a new lounge in Algolia
 * @class
 */
class AlgoliaUtils {
  /**
   * @constructor
   * @param {object} stripeProduct - object containing the product and price ID's for a lounge specified in Stripe.
   */
  constructor(stripeProduct) {
    this.stripeProductId = stripeProduct.experienceId;
    this.stripeWalkUpPriceId = stripeProduct.walkUpPriceId;
    this.stripeReservationPriceId = stripeProduct.reservationPriceId;
    this.AlgoliaObjectId = null;
  }

  /**
   * Post an array of lounge JSON objects to Algolia
   * @param {object} loungeJSON - lounge details in JSON format.
   * @returns Algolia objectId for the created lounge; this can be referenced in the teardown step.
   */
  async postLoungeToAlgolia(loungeJSON) {
    const lounge = loungeJSON;
    const response = await index.saveObjects([lounge], {
      autoGenerateObjectIDIfNotExist: true,
    });
    const objectId = response.objectIDs[0];

    this.AlgoliaObjectId = objectId;

    return objectId;
  }

  async deleteLoungeFromAlgolia() {
    // Algolia doesn't return a response to whether the object has been successfully deleted
    const response = await index.deleteObject(this.AlgoliaObjectId);
    return response;
  }

  createLoungeJSON() {
    const loungeObj = loungeTemplateObj;

    loungeObj.id = this.stripeProductId;
    loungeObj.loungeName = 'Automation Tests Lounge';
    loungeObj.walkUpStripeProductID = this.stripeWalkUpPriceId;
    loungeObj.reservationStripeProductID = this.stripeReservationPriceId;

    return loungeObj;
  }
}

export default AlgoliaUtils;

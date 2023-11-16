import algoliasearch from 'algoliasearch';
import loungeTemplateObj from './loungeTemplateObj';
import { StripeProduct } from '../../types/StripeProduct';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });

const client = algoliasearch(
  process.env.ALGOLIA_APP_ID!,
  process.env.ALGOLIA_WRITE_API_KEY!
);
// type = any, algolia doesn't provide types
const index: any = client.initIndex('test_experiences');

/**
 * Create a new lounge in Algolia
 * @class
 */
class AlgoliaUtils {
  private stripeProductId: string;
  private stripeWalkUpPriceId: string;
  private stripeReservationPriceId: string;
  private AlgoliaObjectId: string | null;
  /**
   * @constructor
   * @param {object} stripeProduct - object containing the product and price ID's for a lounge specified in Stripe.
   */
  constructor(stripeProduct: StripeProduct) {
    this.stripeProductId = stripeProduct.experienceId;
    this.stripeWalkUpPriceId = stripeProduct.walkUpPriceId;
    this.stripeReservationPriceId = stripeProduct.reservationPriceId;
    this.AlgoliaObjectId = null;
  }

  /**
   * Post an array of lounge JSON objects to Algolia
   * @param {object} algoliaLoungeObj - lounge object to send to Algolia.
   * @returns Algolia objectId for the created lounge; this can be referenced in the teardown step.
   */
  async postLoungeToAlgolia(algoliaLoungeObj: any) {
    const lounge = algoliaLoungeObj;
    const response = await index.saveObjects([lounge], {
      autoGenerateObjectIDIfNotExist: true,
    });
    const objectId = response.objectIDs[0];

    this.AlgoliaObjectId = objectId;

    return objectId;
  }

  async deleteLoungeFromAlgolia() {
    // Algolia doesn't return a response to whether the object has been successfully deleted
    if (typeof this.AlgoliaObjectId === 'string') {
      const response = await index.deleteObject(this.AlgoliaObjectId);

      return response;
    }

    throw new Error(
      'Algolia objectId is not in the expected string format. The objectId may be null. Deletion of the lounge from Algolia could not be completed.'
    );
  }

  createAlgoliaLoungeObj() {
    const loungeObj = loungeTemplateObj;

    loungeObj.id = this.stripeProductId;
    loungeObj.loungeName = 'Automation Tests Lounge';
    loungeObj.walkUpStripeProductID = this.stripeWalkUpPriceId;
    loungeObj.reservationStripeProductID = this.stripeReservationPriceId;

    return loungeObj;
  }
}

export default AlgoliaUtils;

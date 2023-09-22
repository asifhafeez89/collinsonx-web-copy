import axios from 'axios';

const STRIPE_URL = process.env.NEXT_PUBLIC_STRIPE_URL;

export interface ReqBody {
  bookingID: string;
  consumerID: string;
  internalProductId: string;
  successUrl: string;
  cancelUrl: string;
  quantity: number;
}

export const getCheckoutSessionUrl = async ({
  bookingID,
  consumerID,
  internalProductId,
  successUrl,
  cancelUrl,
  quantity,
}: ReqBody) => {
  return axios.post(
    `${STRIPE_URL}`,
    {
      bookingID,
      consumerID,
      internalProductId,
      quantity,
      successUrl,
      cancelUrl,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

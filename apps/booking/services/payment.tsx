import axios from 'axios';

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
    `${process.env.NEXT_PUBLIC_STRIPE_URL}`,
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

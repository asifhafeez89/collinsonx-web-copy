import axios from 'axios';

export interface ReqBody {
  bookingID: string;
  consumerID: string;
  internalProductId: string;
  returnUrl: string;
  quantity: number;
}

export const getCheckoutSessionUrl = async ({
  bookingID,
  consumerID,
  internalProductId,
  returnUrl,
  quantity,
}: ReqBody) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_STRIPE_URL}`,
    {
      bookingID,
      consumerID,
      internalProductId,
      quantity,
      returnUrl,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        embedded_checkout_beta: 'v2',
      },
    }
  );
};

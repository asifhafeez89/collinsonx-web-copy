import axios from 'axios';

export interface ReqBody {
  bookingID: string;
  consumerID: string;
  internalProductId: string;
  returnUrl: string;
  quantity: number;
  locale: string;
}

export const getCheckoutSessionUrl = async ({
  bookingID,
  consumerID,
  internalProductId,
  returnUrl,
  quantity,
  locale,
}: ReqBody) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_STRIPE_URL}`,
    {
      bookingID,
      consumerID,
      internalProductId,
      locale,
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

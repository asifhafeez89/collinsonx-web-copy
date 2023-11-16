export const stripePayment = {
  successURL: 'http://localhost:3000/BookingConfirmed?paymentSuccess=true',
  cancelledURL: 'http://localhost:3000/BookLounge?cancelPayment=true',
};

export const apiURL = `https://gateway-api.${process.env.ENV}.cergea.com/graphql`;
export const supertokensURL = `https://authz.${process.env.ENV}.cergea.com/supertokens`;

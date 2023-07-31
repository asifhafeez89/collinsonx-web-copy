const lounges = [
  "BIRMINGHAM",
  "BIRMINGHAM_LOUNGE",
  "BIG_CAVE",
  "CAVE",
  "GATWICK",
  "GATWICK_LOUNGE",
  "HEATHROW",
  "HEATHROW_LOUNGE",
  "HEATHROW_TERMINAL_3",
  "MASSIVE_CAVE",
  "MEDIUM_CAVE",
  "TINY_CAVE"
];

export const loungeMap = new Map(lounges.map((lounge, i) => {
  let loungeNumber = i + 1
  return [`lounge${loungeNumber}`, lounge]
}));

export const stripePayment = {
  successURL: "http://localhost:3000/BookingConfirmed?paymentSuccess=true",
  cancelledURL: "http://localhost:3000/BookLounge?cancelPayment=true"
};

export const apiURL = `https://gateway-api.${process.env.ENV}.cergea.com/graphql`;
const secretTest = process.env.NEXT_PUBLIC_JWT_SECRET_KEY_TEST;
const secretUAT = process.env.NEXT_PUBLIC_JWT_SECRET_KEY_UAT;
const secretProd = process.env.NEXT_PUBLIC_JWT_SECRET_KEY_PROD;

const secrets = {
  'https://booking-local.test.cergea.com:4011': secretTest,
  'https://booking.test.cergea.com': secretTest,
  'https://booking.uat.cergea.com': secretUAT,
  'https://booking.cergea.com': secretProd,
};

export default secrets;

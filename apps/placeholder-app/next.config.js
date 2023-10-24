/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {},
  publicRuntimeConfig: {
    NEXT_PUBLIC_JWT_SECRET_KEY_TEST:
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY_TEST,
    NEXT_PUBLIC_JWT_SECRET_KEY_UAT: process.env.NEXT_PUBLIC_JWT_SECRET_KEY_UAT,
    NEXT_PUBLIC_JWT_SECRET_KEY_PROD:
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY_PROD,
  },
};

module.exports = nextConfig;

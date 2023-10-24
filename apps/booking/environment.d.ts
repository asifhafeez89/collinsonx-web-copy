export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRODUCTION_API_URL: string;
      NEXT_PUBLIC_PRODUCTION_API_URL: string;
      NEXT_PUBLIC_AUTH_API_URL: string;
      FLIGHT_INFO_URL: string;
      FLIGHT_INFO_KEY: string;
      SNAPLOGIC_URL: string;
      SNAPLOGIC_KEY: string;
      NEXT_PUBLIC_SNAPLOGIC_PARTNER_KEY: string;
      NEXT_PUBLIC_JWT_SECRET: string;
      NEXT_PUBLIC_SESSION_SCOPE: string;
      SITE_DOMAIN_URL: string;
      API_SECRET_KEY: string;
      NEXT_PUBLIC_API_SECRET_KEY: string;
      STRIPE_URL: string;
      NEXT_PUBLIC_STRIPE_URL: string;
      NEXT_PUBLIC_URL: string;
      NEXT_PUBLIC_STRIPE_PUBLISHABLE_TOKEN: string;
    }
  }
}

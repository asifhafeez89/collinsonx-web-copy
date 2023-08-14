import type { AppInfoUserInput } from '@collinsonx/utils/supertokens';

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.APP_URL ||
  `http://localhost:${port}`;

const apiDomain = process.env.NEXT_PUBLIC_AUTH_API_URL as string;

export const apiFlightInfo = {
  url: process.env.FLIGHT_INFO_URL,
  subscriptionKey: process.env.FLIGHT_INFO_KEY,
};

export const apiAvailabilityInfo = {
  url: process.env.SNAPLOGIC_URL,
  key: process.env.SNAPLOGIC_KEY,
};

export const appInfo: AppInfoUserInput = {
  appName: 'CollinsonX',
  apiBasePath: '/',
  apiDomain,
  websiteDomain: domain,
};

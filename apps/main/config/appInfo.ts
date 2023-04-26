import type { AppInfoUserInput } from '@collinsonx/utils/supertokens';

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.APP_URL ||
  `http://localhost:${port}`;

export const appInfo: AppInfoUserInput = {
  appName: 'CollinsonX',
  apiBasePath: '/',
  apiDomain: process.env.AUTH_API_URL as string,
  websiteDomain: domain,
};

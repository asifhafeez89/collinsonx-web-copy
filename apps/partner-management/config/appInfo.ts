import type { AppInfoUserInput } from '@collinsonx/utils/supertokens';

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.NEXT_PUBLIC_SITE_DOMAIN_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.APP_URL ||
  `http://partner-local.test.cergea.com:${port}`;

const apiDomain = process.env.NEXT_PUBLIC_AUTH_API_URL as string;

export const appInfo: AppInfoUserInput = {
  appName: 'Cergea',
  apiBasePath: '/supertokens',
  apiDomain,
  websiteDomain: domain,
  websiteBasePath: '/auth',
};

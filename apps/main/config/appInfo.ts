import { AppInfoUserInput } from 'supertokens-auth-react/lib/build/types';

const port = process.env.APP_PORT || 3000;
const domain =
  process.env.VERCEL_URL || process.env.APP_URL || `http://localhost:${port}`;

export const appInfo: AppInfoUserInput = {
  appName: 'CollinsonX',
  apiBasePath: '/api/auth',
  apiDomain: domain,
  websiteDomain: domain,
};

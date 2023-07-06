# Partner managment App

This is the Docs app for this monorepo. You can run it with the following command from the root of the monorepo:

```bash
pnpm dev
```

The app should be up and running at http://localhost:3010.

## Domain configuration

| Branch | Domain                                                         |
| ------ | -------------------------------------------------------------- |
| dev    | (partner.test.cergea.com)[https://partner.test.cergea.com/]    |
| uat    | (partner-uat.test.cergea.com)[https://partner.uat.cergea.com/] |
| main   | (partner.cergea.com)[http://partner.cergea.com/]               |

## Setup CORS access

Setup process got more involved due to recent changes in the backend for CORS access.
Here are the steps to follow to access deployed API through the partner-management app running on your local machine:

1. The following aliases should be placed inside /etc/hosts file:

```
127.0.0.1 partner-local.test.cergea.com
127.0.0.1 partner-local.uat.cergea.com
127.0.0.1 partner-local.cergea.com
```

2. Localhost certificates need to be issued using a cli tool like `mkcert`. There are numerous guides online on how to do this, here is one guide for macOS (there are other similar guides for windows etc.). The correct command should take into account uat alias (not 'localhost'):

```
mkcert -key-file partner-local.uat.cergea-key.pem -cert-file partner-local.uat.cergea.pem partner-local.uat.cergea.com
```

3. The end result of this process is to produce `partner-local.uat.cergea.com.pem` and `partner-local.uat.cergea.com-key.pem` files, which should then be placed inside `colinsonx-web/apps/partner-management` directory

4. A .env.local should be placed inside `collinsonx-web/apps/partner-management` with the following contents:

```
PRODUCTION_API_URL=https://gateway-api.uat.cergea.com/graphql
NEXT_PUBLIC_PRODUCTION_API_URL=https://partner-local.uat.cergea.com:4010/api/graphql
NEXT_PUBLIC_AUTH_API_URL=https://authz.uat.cergea.com
SITE_DOMAIN_URL=https://partner-local.uat.cergea.com:4010
NEXT_PUBLIC_SITE_DOMAIN_URL=https://partner-local.uat.cergea.com:4010
NEXT_PUBLIC_SESSION_THEME=experience
```

5. Once everything is in place, you are in `dev` branch, pulled latest changes and ran `pnpm i` , you need to run `pnpm dev` .

UI will be accessible in HTTPS in the following link:
https://partner-local.uat.cergea.com:4010

This process is to make UI operate with UAT backend. To switch your local UI to another environment, the corresponding certs should be placed in the same directory and you would only need to change `collinsonx-web/apps/partner-management/package.json` : line 7, to import the corresponding certs and also the endpoints listed in `.env.local`.

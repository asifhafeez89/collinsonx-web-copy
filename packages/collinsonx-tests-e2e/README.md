# End-to-end Testing
### Pages
A page represents a specific web page or a portion of a web page. Pages encapsulate the logic necessary to interact with the web page and provide a clear separation of concerns between the test code and the underlying web page.

### Specs
A spec is a test script that uses the pages and utils to perform a specific test. Specs are organized into suites that group related tests together.

## Login/Sign-up
Login/Sign-up uses a service called mailinator to work with the passwordless workflow. Once an email with a OTP is sent we use the mailinator SDK to get the emails and find the OTP that we use to login. On partner sign-up an email is sent to mailinator with a URL that leads to a sign-up form; this URL is extracted and used in playwright to interact with the form to sign-up and automatically login.

## Running tests locally (partner web app)

### Setup CORS access

Setup process got more involved due to recent changes in the backend for CORS access.
Here are the steps to follow to access deployed API through the partner-management app running on your local machine:

1. The following aliases should be placed inside /etc/hosts file (on your local machine):

```
127.0.0.1 partner-local.test.cergea.com
127.0.0.1 partner-local.uat.cergea.com
127.0.0.1 partner-local.cergea.com
```

2. Localhost certificates need to be issued using a cli tool like `mkcert`. There are numerous guides online on how to do this, here is one guide for macOS (there are other similar guides for windows etc.). The correct command should take into account uat alias (not 'localhost').

```
cd apps/partner-management
```

```
mkcert -key-file partner-local.uat.cergea.com-key.pem -cert-file partner-local.uat.cergea.com.pem partner-local.uat.cergea.com
```
The end result of this process is to produce `partner-local.uat.cergea.com.pem` and `partner-local.uat.cergea.com-key.pem` files.

4. A .env.local should be placed inside `collinsonx-web/apps/partner-management` with the following contents:

```
PRODUCTION_API_URL=https://gateway-api.uat.cergea.com/graphql
NEXT_PUBLIC_PRODUCTION_API_URL=https://partner-local.uat.cergea.com:4010/api/graphql
NEXT_PUBLIC_AUTH_API_URL=https://authz.uat.cergea.com
SITE_DOMAIN_URL=https://partner-local.uat.cergea.com:4010
NEXT_PUBLIC_SITE_DOMAIN_URL=https://partner-local.uat.cergea.com:4010
NEXT_PUBLIC_SESSION_THEME=experience
```

5. run `pnpm i` from the root directory , then run `pnpm dev` (this will run all of the apps, so instead you may want to run this command in the apps/partner-management/ directory).

UI will be accessible in HTTPS in the following link:
https://partner-local.uat.cergea.com:4010

This process is to make UI operate with UAT backend (replace with TEST where appropriate if you wish).

6. pnpm i (may need to run pnpm clean beforehand if receiving errors)
7. from the root directory - cd packages/collinsonx-tests-e2e
8. pnpm e2e:local-partner

## Running tests for TEST/UAT environments (partner web app)
1. pnpm i (may need to run pnpm clean beforehand if receiving errors)
2. cd packages/collinsonx-tests-e2e
4. pnpm e2e:<ENVIRONMENT>-partner

## Pipeline
The pipeline is run on Pull Request and will run the e2e_tests.yaml github actions pipeline.
To run the test they perform:
1. npm install -g pnpm
2. pnpm i
3. cd packages/collinsonx-tests-e2e
4. pnpm run e2e:start

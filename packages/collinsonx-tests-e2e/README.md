# End-to-End Testing

### Pages

A page represents a specific web page or a portion of a web page. Pages encapsulate the logic necessary to interact with the web page and provide a clear separation of concerns between the test code and the underlying web page.

### Specs

A spec is a test script that uses the pages and utils to perform a specific test. Specs are organized into suites that group related tests together.

## Running tests locally

### Setup env.tests file

1. 'env.tests' should be created under collinsonx-web/packages/collinsonx-tests-e2e/.env.tests
2. Copy and paste secrets into this file (obtain secrets from David Woods until further notice)

### Setup CORS access

Setup process got more involved due to recent changes in the backend for CORS access.
Here are the steps to follow to access deployed API through the partner-management app running on your local machine:

3. The following alias should be placed inside /etc/hosts file (on your local machine):

```
127.0.0.1 partner-local.test.cergea.com

```

4. Localhost certificates need to be issued using a cli tool like `mkcert`. There are numerous guides online on how to do this, here is one guide for macOS (there are other similar guides for windows etc.). The correct command should take into account TEST alias (not 'localhost').

```
cd apps/partner-management
```

```
mkcert -key-file partner-local.test.cergea.com-key.pem -cert-file partner-local.test.cergea.com.pem partner-local.test.cergea.com
```

The end result of this process is to produce `partner-local.test.cergea.com.pem` and `partner-local.test.cergea.com-key.pem` files.

5. A .env.local should be placed inside `collinsonx-web/apps/partner-management` with the following contents:

```
PRODUCTION_API_URL=https://gateway-api.test.cergea.com/graphql
NEXT_PUBLIC_PRODUCTION_API_URL=https://partner-local.test.cergea.com:4010/api/graphql
NEXT_PUBLIC_AUTH_API_URL=https://authz.test.cergea.com
SITE_DOMAIN_URL=https://partner-local.test.cergea.com:4010
NEXT_PUBLIC_SITE_DOMAIN_URL=https://partner-local.test.cergea.com:4010
```

This process is to make UI operate with TEST backend (replace with UAT where appropriate if you wish).

### Run Local Server

6. Install pm2 - daemon that runs the application on a local server (see: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

```
$ npm install pm2@latest -g
```

7. pnpm i (may need to run pnpm clean beforehand if receiving errors)
8. pnpm run build --filter partner-management
9. cd apps/partner-management
10. pm2 start "pnpm dev:test" --name dev-server

UI will be accessible in the following links:
https://partner-local.test.cergea.com:4010 or http://localhost:3010

### Run Partner web app e2e tests

11. pnpm --filter "@collinsonx/tests-e2e" e2e:test-partner

## Running tests for TEST/UAT environments (partner web app)

1. pnpm i (may need to run pnpm clean beforehand if receiving errors)
2. pnpm --filter "@collinsonx/tests-e2e" e2e:<ENVIRONMENT>-partner

## Pipeline

- The pipeline is run on Pull Request and will run the e2e_tests.yaml github actions pipeline
- Tests local changes using pm2 (see: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

## Notes for testers

#### env.tests

```
ALGOLIA_APP_ID=
ALGOLIA_WRITE_API_KEY=

STRIPE_API_KEY=

SUPER_USER_USERNAME_TEST=
SUPER_USER_PASSWORD_TEST=
SUPER_USER_USERNAME_UAT=
SUPER_USER_PASSWORD_UAT=

MAILINATOR_API_TOKEN=
MAILINATOR_EMAIL_ADDRESS=
```

#### playwright.config.js:

```js
projects: [
    {
      name: 'partner-chromium-test',
      testDir: './tests/partner-management',
      // ENV variable is given by the package.json script
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
        baseURL: `https://partner-local.${process.env.ENV}.cergea.com`
      },
    },
    ...
]
```

- 'projects' - logical groups of tests running with the same configuration. Currently being used to declare baseURL's and testDir's (only one testDir can be assigned to global config/ project)
- global config is overwritten by project specific config

#### package.json:

```json
"scripts": {
    "e2e:test-partner": "ENV=TEST playwright test --project=partner-chromium-test --headed",
    "e2e:uat-partner": "ENV=UAT playwright test --project=partner-chromium-test --headed"
  }
```

- process.env.ENV is set by the script command where ENV=<ENVIRONMENT>
- each script points to a specific playwright 'project'

## Test setup & teardown

Each test uses a different lounge/experience and user/partner; this creates separation between tests so no assertion will be affected by another test (especially when creating/deleting pending requests etc.).

### Usage

For new spec files insert the following:

```js
let partnerDetails;
let lounge;
let loginPage;

test.beforeEach(async ({ page, request }) => {
  lounge = new TestSetup(request);
  partnerDetails = await lounge.setup();
  loginPage = new LoginPage(page);
  await loginPage.login(partnerDetails.email, partnerDetails.password);
});

test.afterEach(async () => {
  await lounge.teardown();
});
```

The 'beforeEach' hook will login each test into the correct partner account. Hence, each test will begin at the homepage.
Remove the below lines when testing login functionality (otherwise the test will already be logged in):

```js
loginPage = new LoginPage(page);
await loginPage.login(partnerDetails.email, partnerDetails.password);
```

### TestSetup class

This class utilises three other util classes: AlgoliaUtils, StripeUtils, and PartnerUtils.

- AlgoliaUtils: A class used to setup and teardown a lounge/experience within Algolia
- StripeUtils: A class used to setup and teardown stripe products (lounge/experience) and stripe prices (walk-up, reservation)
- PartnerUtils: A class used to setup a new partner associated to the lounge/experience used by both the above classes

The setup links the Algolia lounge to the Stripe lounge and the partner.
In each of the classes information is stored such as the experienceId, AlgoliaObjectiD, and the stripe productId; this allows tests to teardown the correct data in the 'afterEach' hook.

## Mailinator

- Mailinator is used where an Email must be obtained for further logic (i.e. extracting authentication tokens and One-Time-Passwords).

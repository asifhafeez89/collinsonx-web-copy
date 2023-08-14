# End-to-End Testing
### Pages
A page represents a specific web page or a portion of a web page. Pages encapsulate the logic necessary to interact with the web page and provide a clear separation of concerns between the test code and the underlying web page.

### Specs
A spec is a test script that uses the pages and utils to perform a specific test. Specs are organized into suites that group related tests together.

## Sign-up
- Sign-up uses a service called Mailinator in order to be able to create random users using a base email address e.g. '@collinsonxteam.testinator.com' (Mailinator collects all emails associated to this base email)
- On partner sign-up an email is sent to Mailinator with a URL that leads to a sign-up form; this URL is extracted (through an api call to Mailinator)and used in playwright to interact with the form to sign-up and automatically login.
- Checkout the code for this in ./tests/partner-management/utils/SignUp.js

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
NEXT_PUBLIC_SESSION_THEME=experience
```

This process is to make UI operate with TEST backend (replace with UAT where appropriate if you wish).

### Run Local Server

6. Install pm2 - daemon that runs the application on a local server (see: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)
```
$ npm install pm2@latest -g
```
7. pnpm i (may need to run pnpm clean beforehand if receiving errors)
8. cd apps/partner-management
9. pm2 start "pnpm dev:test" --name dev-server  

UI will be accessible in the following links:
https://partner-local.test.cergea.com:4010 or http://localhost:3010

### Run Partner web app e2e tests

10. pnpm --filter "@collinsonx/tests-e2e" e2e:local-partner  

## Running tests for TEST/UAT environments (partner web app)
1. pnpm i (may need to run pnpm clean beforehand if receiving errors)
2. pnpm --filter "@collinsonx/tests-e2e" e2e:<ENVIRONMENT>-partner

## Pipeline
- The pipeline is run on Pull Request and will run the e2e_tests.yaml github actions pipeline
- Tests local changes using pm2 (see: https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/)

## Notes for testers

### Auth

This section will discuss the set-up, and usage of 'auth' (user.json files) for the tests to use in order to login to the app via the API.

'auth.setup.js' is classed as a 'test' and runs before all other tests in order to create user.json files. These files store auth cookies for the tests to use and automatically be logged in. This uses API calls and so gives us separation between 'login tests' and all other tests (if the UI login functionality is not working then we still have the ability to test other aspects of the app).

```js
import { loungeMap } from '../utils/config';

setup('authenticate', async ({ request }) => {
  for (const lounge of loungeMap.values()) {
    ...
  };
});
```
- users (partners) can be added by adding a lounge to the lounges array in ../utils/config; this updates the loungeMap object which is used per test for authentication:
```js
const lounge = loungeMap.get("lounge1");
test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
```
- simply refer to a lounge as "lounge\<number\>" (if lounges are uopdated in the future then they only need to be updated in the config - DRY)
- the 'secrets' for each user are placed in the env.tests file
- 'setup' (shown above) runs on a loop over the array and creates user.json files using the before-mentioned secrets
- once the json (cookies) have been used by a test, they become invalidated. Hence, usage of the same user may not work. It's best to create a brand new partner for the test to use (separation between tests and their assertions)
- To create new partners scroll to "Creating partners for tests"

#### env.tests
```
X_USER_ID=
EXPERIENCE_ID=
HEATHROW_USERNAME_UAT=
HEATHROW_PASSWORD_UAT=
HEATHROW_USERNAME_TEST=
HEATHROW_PASSWORD_TEST=
```

#### playwright.config.js:
```js
projects: [
    { name: 'setup', testMatch: /auth.setup\.js/ },
    {
      name: 'partner-chromium-test',
      testDir: './tests/partner-management',
      // ENV variable is given by the package.json script
      use: { 
        ...devices['Desktop Chrome'], 
        storageState: 'playwright/.auth/user.json', 
        baseURL: `https://partner.${process.env.ENV}.cergea.com` 
      },
      dependencies: ['setup'],
    }
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

#### usage within spec files:
```js
test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.describe('add pending request using the booking API', () => {
            const lounge = loungeMap.get("lounge1");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
            test('should increase the booking count by 1', async ({ page }) => {
                ...
            });
        });
        test.describe('remove pending request using the booking API', () => {
            const lounge = loungeMap.get("lounge2");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })     
            test('should decrease the booking count by 1', async ({ page }) => {
                ...
            });
        });

    });
});
```
- test.use({ storageState: <user>.json)}) must be placed before the test that requires it
- placing this inside the test will not work as intended, and placing this before a describe step will cause all tests within the describe block to use the same user.json
- as shown above, you may need to create an additional decribe block within the conventional describe blocks for the intended outcome

## Creating partners for tests
Each test uses a different lounge and user (partner); this creates separation between tests as no assertion will be affected by another test (especially when creating/deleting pending requests etc.).

Pre-requisites:
- Stripe access
- Algolia access
- Mailinator access
- backend-apps repo access
- env.tests file (ask David Woods for the most up-to-date version)
- Permissions to update github actions secret variables

### Steps (create a new lounge):

1) Open the following directory - https://github.com/CollinsonX/backend-apps/tree/develop/apis/search-api/search-seed-data
2) DO NOT update the seed-data.json as this is PROD. The other two files should be clearly labelled as TEST or UAT
3) Make the same changes to both TEST and UAT seed-data
4) Open either json file then copy one of the lounge objects and paste it at the bottom of the array
5) Create a uuidv4 (e.g. https://www.uuidgenerator.net/version4) and use this for the object id (will refer to this as \<EXPERIENCE_ID\> in later steps)
6) Also, edit the following properties: loungeName (will refer to this as \<LOUNGE_NAME\> in later steps), location{ terminal, cgTerminalCode, cgTerminal }, uniqueValueKey
7) 'walkUpStripeProductID' and 'reservationStripeProductID' will also need to be updated, but first head to the stripe dashboard (https://dashboard.stripe.com/test/developers)
8) navigate to 'Products' in the top nav bar
9) Making sure you are in 'Test mode' (check top nav bar), click on 'Add product'
10) Name = "\<LOUNGE_NAME\> - Lounge Entry Reservation"
11) Product tax category = Non-taxable
12) Price = same as 'lifestyleXReservationCharge' specified in your json object (seed-data)
13) Set Pricing to 'One time' then 'Save Product'
14) Copy the productId (e.g. prod_OL8IVgexsN0FYn) to the 'reservationStripeProductID' json object property
15) Edit the metadata for the stripe product (stripe UI) to include 'internalProductId': \<EXPERIENCE_ID\>
16) Click on the product price. You will then be able to edit it's metadata which should be the same as in the previous step
17) Copy the entire json file and head to https://dashboard.algolia.com/apps/UBD5VQIJUK/explorer/browse/ - select either 'uat_experiences' or 'test_experiences'. Click on 'MANAGE INDEX' then 'Clear' (this will clear all current lounge data). Click on 'Upload data', 'Add manually' then paste in your entire json file
18) Update the env.tests file
```
<LOUNGE_NAME>_USERNAME_UAT=<STRING>@collinsonxteam.testinator.com
<LOUNGE_NAME>_PASSWORD_UAT=<STRING>
<LOUNGE_NAME>_EXPERIENCE_ID=<EXPERIENCE_ID>
```
19) Update github action secret \<ENV_TESTS_FILE\>
20) DONE...creating a lounge

### Steps (create partner, associate to created lounge):
Mutation
```js
mutation Mutation($invitationInput: InvitationInput) {
  createInvitation(invitationInput: $invitationInput) {
    id
    experience {
      id
      loungeName
    }
  }
}
```
Variables
```json
{
  "invitationInput": {
    "inviteeEmail": <STRING>@collinsonxteam.testinator.com, // same email as in env.tests
    "userType": "PARTNER",
    "experience": {
      "id": <EXPERIENCE_ID> // same id as in env.tests
    }
  }
}
```
Headers
```json
x-user-id: <SECRET> // obtain from devs/testers
x-user-type: SUPER_USER
```
1) Make the above request to either https://gateway-api.uat.cergea.com/graphql or https://gateway-api.test.cergea.com/graphql
2) Open Mailinator. Access email and click on the link provided. Enter the email address of the partner, and create a password (must be the same as specified in the env.tests file)
3) update lounges array in config with new lounge name (e.g. add "HEATHROW")
4) DONE!...at last

Potential Issues - and solutions:
- GraphQL responds with a null object. Solution - inspect webpage, navigate to the 'Application' tab, then delete the sAccessToken cookie. Retry the mutation
- Stripe price id is undefined (can occur when adding pending requests). Solution - you are missing metadata for either the product or the product's prices section. Both must contain 'internalProductId': \<EXPERIENCE_ID\>
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  const response = await request.post('https://authz.test.cergea.com/supertokens/signin', {
    data: {
      "formFields": [
        { "id": "email", "value": "automationuserpartner@clearrouteteam.testinator.com" },
        { "id": "password", "value": "CollinsonXpartner123" }
      ]
    },
    headers: { "St-Auth-Mode": "cookie" } // required to return 'cookies' in the 'set-cookies' header 
  });

  await request.storageState({ path: authFile });
});
import { test as setup } from '@playwright/test';
require('dotenv').config();

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  const password = process.env.ENV === "UAT" ? "CollinsonXPartner123" : "CollinsonXpartner123"
  const response = await request.post(`https://authz.${process.env.ENV}.cergea.com/supertokens/signin`, {
    data: {
      "formFields": [
        { "id": "email", "value": "automationuserpartner@clearrouteteam.testinator.com" },
        { "id": "password", "value": password }
      ]
    },
    headers: { "St-Auth-Mode": "cookie" } // required to return 'cookies' in the 'set-cookies' header 
  });

  await request.storageState({ path: authFile });
});
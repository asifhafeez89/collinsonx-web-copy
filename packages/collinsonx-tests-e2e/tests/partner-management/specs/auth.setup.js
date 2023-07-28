import { test as setup } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });
import { users } from '../utils/users';


setup('authenticate', async ({ request }) => {
  for (const user of users) {
    const password = process.env[user + "_PASSWORD_" + process.env.ENV];
    const username = process.env[user + "_USERNAME_" + process.env.ENV];

    const response = await request.post(`https://authz.${process.env.ENV}.cergea.com/supertokens/signin`, {
      data: {
        "formFields": [
          { "id": "email", "value": username },
          { "id": "password", "value": password }
        ]
      },
      headers: { "St-Auth-Mode": "cookie" } // required to return 'cookies' in the 'set-cookies' header 
    });

    const authFile = `playwright/.auth/${user.toLowerCase()}User.json`;

    await request.storageState({ path: authFile });
  };
});
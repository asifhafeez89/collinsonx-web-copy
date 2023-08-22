import { test as setup } from '../../../baseFixtures';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });
import { loungeMap } from '../utils/config';


setup('authenticate', async ({ request }) => {
  for (const lounge of loungeMap.values()) {
    const password = process.env[lounge + "_PASSWORD_" + process.env.ENV];
    const username = process.env[lounge + "_USERNAME_" + process.env.ENV];

    const response = await request.post(`https://authz.${process.env.ENV}.cergea.com/supertokens/signin`, {
      data: {
        "formFields": [
          { "id": "email", "value": username },
          { "id": "password", "value": password }
        ]
      },
      headers: { "St-Auth-Mode": "cookie" } // required to return 'cookies' in the 'set-cookies' header
    });

    const authFile = `playwright/.auth/${lounge.toLowerCase()}User.json`;

    await request.storageState({ path: authFile });
  };
});
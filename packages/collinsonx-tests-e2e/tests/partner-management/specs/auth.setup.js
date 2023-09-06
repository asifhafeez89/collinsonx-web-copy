import { test as setup } from '../../../baseFixtures';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });
import { loungeMap, supertokensURL } from '../utils/config';

setup('authenticate', async ({ request }) => {
  for (const lounge of loungeMap.values()) {
    const password = process.env[lounge + "_PASSWORD_" + process.env.ENV];
    const username = process.env[lounge + "_USERNAME_" + process.env.ENV];

    const response = await request.post(supertokensURL, {
      data: {
        "formFields": [
          { "id": "email", "value": username },
          { "id": "password", "value": password }
        ]
      },
      headers: {
        "St-Auth-Mode": "cookie",
        Accept: 'application/json',
        'Content-Type': 'application/json',
        rid: 'emailpassword',
      } // required to return 'cookies' in the 'set-cookies' header
    });

    const authFile = `playwright/.auth/${lounge.toLowerCase()}User.json`;

    await request.storageState({ path: authFile });
  };
});

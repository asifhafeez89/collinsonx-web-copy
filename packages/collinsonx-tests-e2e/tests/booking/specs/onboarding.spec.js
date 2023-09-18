import { signJWT } from '@collinsonx/jwt';
import { v4 as uuidv4 } from 'uuid';
import { redirectToBaas } from '../utils/redirectToBaas';
import { getPinFromEmail } from '../utils/emailUtils';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import RegistrationPage from '../pages/RegistrationPage';
import PreBookPage from '../pages/PreBookPage';

import { mailinatorAddress } from '../config';
import { test, expect } from '../../../baseFixtures';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

test.describe('Onboarding flow - end to end happy path', () => {
  test.describe('Valid JWT and all mandatory fields', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);
      const enterPinPage = new EnterPinPage(page);
      const registrationPage = new RegistrationPage(page);
      const preBookPage = new PreBookPage(page);

      const payload = {
        membershipNumber: uuidv4(),
        consumerNumber: uuidv4(),
        email: 'test@test.com',
        firstName: 'Alice',
        lastName: 'Smith',
        membershipType: 'MASTERCARD_HSBC',
        accountProvider: 'PRIORITY_PASS',
      };
      const expirationTime = '12h';
      const jwt = await signJWT(payload, secret, expirationTime);
      const lounge = 'BHX7';
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);

      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual(
        'Clubrooms Birmingham - Additional Fee Applies'
      );
    });
  });
});

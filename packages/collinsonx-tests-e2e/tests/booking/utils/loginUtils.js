import { signJWT } from '@collinsonx/jwt';
import { mailinatorAddress } from '../config';
import { redirectToBaas } from '../utils/redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import { getPinFromEmail } from '../utils/emailUtils';

export function getEmailAddress(id) {
  return `${id}@${mailinatorAddress}`;
}

export async function loginAsExistingUser(
  page,
  id,
  membershipNumber,
  externalId
) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
  const email = getEmailAddress(id);
  const payload = {
    membershipNumber,
    externalId,
    email,
    firstName: 'Alice',
    lastName: 'Smith',
    membershipType: 'MASTERCARD_HSBC',
    accountProvider: 'PRIORITY_PASS',
  };
  const jwt = await signJWT(payload, secret);
  const lounge = 'BHD1';

  await redirectToBaas(page, jwt, lounge);

  const enterEmailPage = new EnterEmailPage(page);
  await enterEmailPage.clickContinue();
  await page.waitForTimeout(5000);
  const pin = await getPinFromEmail(email);

  const enterPinPage = new EnterPinPage(page);
  await enterPinPage.enterPin(pin);
  await enterPinPage.clickVerify();
}

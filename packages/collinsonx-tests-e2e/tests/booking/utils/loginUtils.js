import { signJWT } from '@collinsonx/jwt';
import { mailinatorAddress } from '../config';
import { redirectToBaas } from '../utils/redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import { getPinFromEmail } from '../utils/emailUtils';
import UpdateDetailsPage from '../pages/UpdateDetailsPage';

export function getEmailAddress(id) {
  return `${id}@${mailinatorAddress}`;
}

export async function getAndEnterPin(page, email) {
  const enterEmailPage = new EnterEmailPage(page);
  await enterEmailPage.clickContinue();
  await page.waitForTimeout(10000);

  const pin = await getPinFromEmail(email);

  const enterPinPage = new EnterPinPage(page);
  await enterPinPage.enterPin(pin);
  await enterPinPage.clickVerify();
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

  await getAndEnterPin(page, email);

  try {
    const updateDetailsPage = new UpdateDetailsPage(page);
    await updateDetailsPage.clickLogin();
  } catch (err) {
    // pass to next page
  }
}

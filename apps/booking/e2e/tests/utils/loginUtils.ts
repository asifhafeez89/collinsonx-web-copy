import { signJWT } from '@collinsonx/jwt';
import { mailinatorAddress } from '../config';
import { redirectToBaas } from './redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import { getPinFromEmail } from './emailUtils';
import RegistrationPage from '../pages/RegistrationPage';
import { v4 as uuidv4 } from 'uuid';
import { Page } from '@playwright/test';

export function getIdWithPrefix() {
  return 'e2e-' + (process.env.ENV || 'test').toLowerCase() + '-' + uuidv4();
}

export function getEmailAddress(id: string) {
  return `${id}@${mailinatorAddress}`;
}

export async function getAndEnterPin(page: any, email: string) {
  const enterEmailPage = new EnterEmailPage(page);
  await enterEmailPage.clickContinue();

  try {
    await page.waitForTimeout(10000);
  } catch {
    await page.mainFrame().waitForTimeout(10000);
  }

  const pin = await getPinFromEmail(email);

  const enterPinPage = new EnterPinPage(page);
  await enterPinPage.enterPin(pin);
  await enterPinPage.clickVerify();
}

export async function loginAsExistingUser(
  page: Page,
  id: string,
  membershipNumber: string,
  externalId: string
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
}

export async function loginAsNewUser(
  page: Page,
  id: string,
  membershipNumber: string,
  externalId: string
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

  const registrationPage = new RegistrationPage(page);
  await registrationPage.clickLogin();
}

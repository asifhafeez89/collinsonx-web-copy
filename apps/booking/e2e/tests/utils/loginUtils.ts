import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from './redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import { getPinFromEmail } from './emailUtils';
import RegistrationPage from '../pages/RegistrationPage';
import { Page } from '@playwright/test';
import {
  generateEmailAddress,
  generateNewUser,
  generateExistingUser,
} from '../utils/mockData';
import { getIdFromEmail } from '../utils/emailUtils';

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

export async function loginUser(
  page: Page,
  id: string,
  membershipNumber: string,
  externalId: string
) {
  const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
  const email = generateEmailAddress(id);
  const payload = generateExistingUser(email, membershipNumber, externalId);
  const jwt = await signJWT(payload, secret);
  const lounge = 'BHD1';

  await redirectToBaas(page, jwt, lounge);

  await getAndEnterPin(page, email);
}

export async function createAndLoginUser(page: Page) {
  const payload = generateNewUser();
  const id = getIdFromEmail(payload.email || '');
  await loginUser(page, id, payload.membershipNumber, payload.externalId);

  return payload;
}

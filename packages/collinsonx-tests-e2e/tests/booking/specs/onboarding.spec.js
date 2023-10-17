import { signJWT } from '@collinsonx/jwt';
import { v4 as uuidv4 } from 'uuid';
import { redirectToBaas } from '../utils/redirectToBaas';
import { getPinFromEmail } from '../utils/emailUtils';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import RegistrationPage from '../pages/RegistrationPage';
import PreBookPage from '../pages/PreBookPage';
import ErrorPage from '../pages/ErrorPage';

import { mailinatorAddress } from '../config';
import { test, expect } from '../../../baseFixtures';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

const lounge = 'MAN6';
const membershipType = 'MASTERCARD_HSBC';
const accountProvider = 'PRIORITY_PASS';
const firstName = 'Alice';
const lastName = 'Smith';

async function getPageObjectModel(page) {
  const enterEmailPage = new EnterEmailPage(page);
  const enterPinPage = new EnterPinPage(page);
  const registrationPage = new RegistrationPage(page);
  const preBookPage = new PreBookPage(page);
  const errorPage = new ErrorPage(page);
  return {
    enterEmailPage,
    enterPinPage,
    registrationPage,
    preBookPage,
    errorPage,
  };
}

async function assertRegistrationPageDetails(
  registrationPage,
  expectedFirstName,
  expectedLastName,
  expectedEmail
) {
  const firstNameValue = await registrationPage.firstNameValue();
  const lastNameValue = await registrationPage.lastNameValue();
  const emailValue = await registrationPage.emailValue();

  await expect(firstNameValue).toEqual(expectedFirstName);
  await expect(lastNameValue).toEqual(expectedLastName);
  await expect(emailValue).toEqual(expectedEmail);
}

test.describe('Onboarding flow', () => {
  test.describe('ONB-001 - User registration with new email in JWT - with first name and last name', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email, first name and last name ', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        email,
        firstName,
        lastName,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();
      await assertRegistrationPageDetails(
        registrationPage,
        firstName,
        lastName,
        email
      );
      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-002 - User registration with new email in JWT - without first name and last name', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        email,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();
      await assertRegistrationPageDetails(registrationPage, null, null, email);
      await (await registrationPage.firstNameInput()).type(firstName);
      await (await registrationPage.lastNameInput()).type(lastName);
      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-003 - User registration with new email - no details in JWT', () => {
    test('User should be navigated to the pre-booking page ', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();
      await assertRegistrationPageDetails(registrationPage, null, null, email);
      await (await registrationPage.firstNameInput()).type(firstName);
      await (await registrationPage.lastNameInput()).type(lastName);
      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-004 - User registration with existing email, membership number and external id', () => {
    test('User should be navigated to the pre-booking page without going through registration process', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, preBookPage } =
        await getPageObjectModel(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount1';
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: '888111356',
        externalId: '888111356',
        email,
        firstName: 'Alice',
        lastName: 'Smith',
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-006 - User registration with existing email and external id', () => {
    test('User should be navigated to the pre-booking page without going through registration process ', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, preBookPage } =
        await getPageObjectModel(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount55';
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        externalId: '127643578',
        email,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-011- User enters incorrect confirmation code', () => {
    test('User should see an error message  indicating that the code is incorrect.', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const invalidPin = '123456';
      await enterPinPage.enterPin(invalidPin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await enterPinPage.invalidCodeError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('ONB-012- Enter confirmation code incorrectly 5 times', () => {
    test('User should see an error message saying sorry, too many wrong attempts', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const invalidPin = '123456';
      const numberOfAttempts = 5;
      for (let i = 0; i < numberOfAttempts; i++) {
        await enterPinPage.enterPin(invalidPin);
        await enterPinPage.clickVerify();
      }

      // Assert
      const errorElement = await enterPinPage.tooManyAttemptsError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('ONB-013 - Click re-enter your email address and enter new email', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        email,
        firstName,
        lastName,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await enterPinPage.clickReEnterEmailLink();
      const newId = uuidv4() + process.env.ENV.toLowerCase();
      const newEmail = `${newId}@${mailinatorAddress}`;
      await enterEmailPage.enterEmail(newEmail);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(newEmail);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();
      await page.waitForTimeout(2000);
      await assertRegistrationPageDetails(
        registrationPage,
        firstName,
        lastName,
        newEmail
      );
      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-014 - Load page with lounge details', () => {
    test('User should be navigated to the pre-booking page and the lounge name, price, airport/terminal name and flight details are displayed', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: uuidv4(),
        externalId: uuidv4(),
        email,
        firstName,
        lastName,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();
      await registrationPage.clickConfirm();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      const airportAndTerminalElement =
        await preBookPage.airportAndTerminalElement(
          'Manchester International, Terminal 1'
        );
      const priceElement = await preBookPage.priceElement('£ 6.00');

      await expect(loungeTitle).toEqual('Aspire Lounge');
      await expect(airportAndTerminalElement).not.toBeNull();
      await expect(priceElement).not.toBeNull();
    });
  });

  test.describe('ONB-015 - User registration with new email and existing membership number', () => {
    test('User should see a linked to a different email address error message', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      const payload = {
        membershipNumber: '98794810',
        externalId: uuidv4(),
        email,
        firstName,
        lastName,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await enterEmailPage.incorrectEmailError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('ONB-016 - User registration with new email and existing external ID', () => {
    test('User should see a linked to a different email address error message', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage } =
        await getPageObjectModel(page);
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;

      const payload = {
        membershipNumber: uuidv4(),
        externalId: '071189',
        email,
        firstName,
        lastName,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await enterEmailPage.incorrectEmailError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('Invalid JWT secret', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, errorPage } =
        await getPageObjectModel(page);
      const membershipNumber = uuidv4();
      const secret = 'invalid';
      const externalId = uuidv4();
      const id = uuidv4() + process.env.ENV.toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      const payload = {
        membershipNumber,
        externalId,
        accountProvider,
        email,
        firstName,
        lastName,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).not.toBeNull();
    });
  });
});

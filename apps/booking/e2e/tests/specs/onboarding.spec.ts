import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from '../utils/redirectToBaas';
import { getPinFromEmail } from '../utils/emailUtils';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import RegistrationPage from '../pages/RegistrationPage';
import PreBookPage from '../pages/PreBookPage';
import ErrorPage from '../pages/ErrorPage';
import { test, expect } from '../baseFixtures';
import { getEmailAddress, getIdWithPrefix } from '../utils/loginUtils';
import { Page } from '@playwright/test';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
const lounge = 'MAN6';
const membershipType = 'MASTERCARD_HSBC';
const accountProvider = 'PRIORITY_PASS';
const firstName = 'Alice';
const lastName = 'Smith';

async function getPageObjectModel(page: Page) {
  return {
    enterEmailPage: new EnterEmailPage(page),
    enterPinPage: new EnterPinPage(page),
    registrationPage: new RegistrationPage(page),
    preBookPage: new PreBookPage(page),
    errorPage: new ErrorPage(page),
  };
}

async function assertRegistrationPageDetails(
  registrationPage: RegistrationPage,
  expectedFirstName: string | null,
  expectedLastName: string | null,
  expectedEmail: string
) {
  const firstNameValue = await registrationPage.firstNameValue();
  const lastNameValue = await registrationPage.lastNameValue();
  const emailValue = await registrationPage.emailValue();

  expect(firstNameValue).toEqual(expectedFirstName);
  expect(lastNameValue).toEqual(expectedLastName);
  expect(emailValue).toEqual(expectedEmail);
}

test.describe('Onboarding flow', () => {
  test.describe('ONB-001 - User registration with new email in JWT - with first name and last name', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email, first name and last name ', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);
      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
        email,
        firstName,
        lastName,
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
      await assertRegistrationPageDetails(
        registrationPage,
        firstName,
        lastName,
        email
      );
      await registrationPage.clickLogin();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-002 - User registration with new email in JWT - without first name and last name', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      await (await registrationPage.firstNameInput()).fill(firstName);
      await (await registrationPage.lastNameInput()).fill(lastName);
      await registrationPage.clickLogin();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-003 - User registration with new email - no details in JWT', () => {
    test('User should be navigated to the pre-booking page ', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);
      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      await (await registrationPage.firstNameInput()).fill(firstName);
      await (await registrationPage.lastNameInput()).fill(lastName);
      await registrationPage.clickLogin();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
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
      const email = getEmailAddress(id);

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

      // Waiting for the latest email (only for existing users)
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
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
      const email = getEmailAddress(id);

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

      // Waiting for the latest email (only for existing users)
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-007 - Resend code functionality', () => {
    test('User should be navigated to the pre-booking page', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, preBookPage } =
        await getPageObjectModel(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount4';
      const email = getEmailAddress(id);

      const payload = {
        externalId: '89760499',
        email,
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();

      // Can resend after 20 seconds
      await page.waitForTimeout(20000);
      await enterPinPage.clickResend();

      // Waiting for the latest email (only for existing users)
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      await expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-008 - Error message for invalid email format', () => {
    test('A small error message should appear under the text box, indicating that the email format is invalid.', async ({
      page,
    }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);
      const email = 'emailAddressInWrongFormat';
      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
        membershipType,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();

      // Assert
      const errorElement = await enterEmailPage.wrongEmailFormatError();
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-011- User enters incorrect confirmation code', () => {
    test('User should see an error message  indicating that the code is incorrect.', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-012- Enter confirmation code incorrectly 5 times', () => {
    test('User should see an error message saying sorry, too many wrong attempts', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-013 - Click re-enter your email address and enter new email', () => {
    test('User should be navigated to the pre-booking page and prepopulation of email', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      const newId = getIdWithPrefix();
      const newEmail = getEmailAddress(newId);
      await enterEmailPage.enterEmail(newEmail);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(newEmail);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      await assertRegistrationPageDetails(
        registrationPage,
        firstName,
        lastName,
        newEmail
      );
      await registrationPage.clickLogin();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      expect(loungeTitle).toEqual('Aspire Lounge');
    });
  });

  test.describe('ONB-014 - Load page with lounge details', () => {
    test('User should be navigated to the pre-booking page and the lounge name, price, airport/terminal name and flight details are displayed', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage, preBookPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
        externalId: getIdWithPrefix(),
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
      await registrationPage.clickLogin();

      // Assert
      const loungeTitle = await preBookPage.loungeTitle();
      const airportAndTerminalElement =
        await preBookPage.airportAndTerminalElement(
          'Manchester International, Terminal 1'
        );
      const priceElement = await preBookPage.priceElement('£ 6.00');

      expect(loungeTitle).toEqual('Aspire Lounge');
      await expect(airportAndTerminalElement).toBeVisible();
      await expect(priceElement).toBeVisible();
    });
  });

  test.describe('ONB-015 - User registration with new email and existing membership number', () => {
    test('User should see a linked to a different email address error message', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);
      const payload = {
        membershipNumber: '98794810',
        externalId: getIdWithPrefix(),
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
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-016 - User registration with new email and existing external ID', () => {
    test('User should see a linked to a different email address error message', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, registrationPage } =
        await getPageObjectModel(page);
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);

      const payload = {
        membershipNumber: getIdWithPrefix(),
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
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-017 Invalid JWT secret', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const { enterEmailPage, enterPinPage, errorPage } =
        await getPageObjectModel(page);
      const membershipNumber = getIdWithPrefix();
      const secret = 'invalid';
      const externalId = getIdWithPrefix();
      const id = getIdWithPrefix();
      const email = getEmailAddress(id);
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
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible();
    });
  });
});

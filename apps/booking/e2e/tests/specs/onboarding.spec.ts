import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from '../utils/redirectToBaas';
import { getPinFromEmail } from '../utils/emailUtils';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import RegistrationPage from '../pages/RegistrationPage';
import PreBookPage from '../pages/PreBookPage';
import ErrorPage from '../pages/ErrorPage';
import { test, expect } from '../baseFixtures';
import { Page } from '@playwright/test';
import {
  generateIdWithPrefix,
  generateEmailAddress,
  generateFirstName,
  generateLastName,
  generateNewUser,
  generateNewUserWithoutName,
  generateNewUserWithoutNameAndEmail,
} from '../utils/mockData';
import { createAndLoginUser, loginUser } from '../utils/loginUtils';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
const lounge = 'MAN6';

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
  expectedEmail: string | null
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
      const { registrationPage, preBookPage } = await getPageObjectModel(page);

      // Act
      const user = await createAndLoginUser(page);
      await assertRegistrationPageDetails(
        registrationPage,
        user.firstName || '',
        user.lastName || '',
        user.email || ''
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
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUserWithoutName(email);
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      await assertRegistrationPageDetails(registrationPage, null, null, email);
      await (await registrationPage.firstNameInput()).fill(generateFirstName());
      await (await registrationPage.lastNameInput()).fill(generateLastName());
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
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUserWithoutNameAndEmail();
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      await assertRegistrationPageDetails(registrationPage, null, null, email);
      await (await registrationPage.firstNameInput()).fill(generateFirstName());
      await (await registrationPage.lastNameInput()).fill(generateLastName());
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
      const { preBookPage } = await getPageObjectModel(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount1';
      const membershipNumber = '888111356';
      const externalId = '888111356';

      // Act
      await loginUser(page, id, membershipNumber, externalId);

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
      const externalId = '127643578';

      // Act
      await loginUser(page, id, '', externalId);

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
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
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

      const registrationPage = new RegistrationPage(page);
      await registrationPage.clickLogin();

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
      const payload = generateNewUser(email);
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

  test.describe('ONB-009 - User registration with already used confirmation code', () => {
    test('User should see an error message indicating that the code has been already used.', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();

      // Waiting for the latest email (only for existing users)
      await page.waitForTimeout(5000);
      const pin = await getPinFromEmail(email);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Enter an already used confirmation code
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      // Assert
      const errorElement = await enterPinPage.alreadyUsedCodeError();
      await expect(errorElement).toBeVisible();
    });
  });

  test.describe('ONB-011- User enters incorrect confirmation code', () => {
    test('User should see an error message  indicating that the code is incorrect.', async ({
      page,
    }) => {
      // Arrange
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
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
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
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
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);
      await enterEmailPage.clickContinue();
      await enterPinPage.clickReEnterEmailLink();
      const newId = generateIdWithPrefix();
      const newEmail = generateEmailAddress(newId);
      await enterEmailPage.enterEmail(newEmail);
      await enterEmailPage.clickContinue();
      const pin = await getPinFromEmail(newEmail);
      await enterPinPage.enterPin(pin);
      await enterPinPage.clickVerify();

      await assertRegistrationPageDetails(
        registrationPage,
        generateFirstName(),
        generateLastName(),
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

      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, 'MAN6');
      await enterEmailPage.enterEmail(email);
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
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);

      payload.membershipNumber = '98794810';

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
      const { enterEmailPage, enterPinPage } = await getPageObjectModel(page);
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);

      payload.externalId = '071189';

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
      const secret = 'invalid';
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUser(email);
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

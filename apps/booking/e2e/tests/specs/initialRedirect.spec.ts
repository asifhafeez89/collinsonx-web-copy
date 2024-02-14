import { test, expect } from '../baseFixtures';
import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from '../utils/redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import ErrorPage from '../pages/ErrorPage';
import {
  generateEmailAddress,
  generateIdWithPrefix,
  generateNewUser,
  generateNewUserWithoutName,
} from '../utils/mockData';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
const lounge = 'MAN6';
const accountProvider = 'PRIORITY_PASS';

test.describe('Initial Redirect to BAAS page', () => {
  test.describe('RDR-001 - Valid JWT and all mandatory fields', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);

      const payload = generateNewUser();
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      expect(emailPageTitle).toEqual(enterEmailPage.emailTitleText());
    });
  });

  test.describe('RDR-002 - Valid JWT but missing membershipNumber', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);

      const fullPayload = generateNewUser();
      const payload = Object.fromEntries(
        Object.entries(fullPayload).filter((e) => e[0] != 'membershipNumber')
      );

      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      expect(emailPageTitle).toEqual(enterEmailPage.emailTitleText());
    });
  });

  test.describe('RDR-003 - Valid JWT but missing accountProvider', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);

      const fullPayload = generateNewUser();
      const payload = Object.fromEntries(
        Object.entries(fullPayload).filter((e) => e[0] != 'accountProvider')
      );

      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('RDR-004 - Valid JWT but missing externalId', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);

      const fullPayload = generateNewUser();
      const payload = Object.fromEntries(
        Object.entries(fullPayload).filter((e) => e[0] != 'externalId')
      );

      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('RDR-007 - Valid JWT and optional email', () => {
    test('should redirect successfully and user can see Enter your email page with the email pre-populated', async ({
      page,
    }) => {
      const enterEmailPage = new EnterEmailPage(page);

      // Arrange
      const id = generateIdWithPrefix();
      const email = generateEmailAddress(id);
      const payload = generateNewUserWithoutName(email);

      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      const emailInputValue = await enterEmailPage.emailInputValue();
      expect(emailPageTitle).toEqual(enterEmailPage.emailTitleText());
      expect(emailInputValue).toEqual(email);
    });
  });

  test.describe('RDR-008 - Valid JWT and optional firstName and lastName', () => {
    test('should redirect successfully', async ({ page }) => {
      const enterEmailPage = new EnterEmailPage(page);

      // Arrange
      const payload = generateNewUser();
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      expect(emailPageTitle).toEqual(enterEmailPage.emailTitleText());
    });
  });

  test.describe('RDR-014 - Direct access without JWT', () => {
    test('User can see error message “service not available”', async ({
      page,
    }) => {
      // Arrange
      const errorPage = new ErrorPage(page);

      // Act
      await page.goto(`/?loungeCode=${lounge}`, { waitUntil: 'networkidle' });

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('RDR-015 - URL with lounge code for lounge that does not exist', () => {
    test('User can see error message “lounge not available”', async ({
      page,
    }) => {
      const errorPage = new ErrorPage(page);

      // Arrange
      const payload = generateNewUser();
      const jwt = await signJWT(payload, secret);
      const lounge = 'invalid';

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.loungeNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('RDR-016 - URL with both valid and invalid parameters', () => {
    test('Redirection successful, but extra parameters ignored', async ({
      page,
    }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);

      const payload = generateNewUser();
      const jwt = await signJWT(payload, secret);

      // Act
      const url = `/?linkAccountToken=${jwt}&loungeCode=${lounge}&extra=xyz&ln=en`;
      await page.goto(url, {
        waitUntil: 'networkidle',
      });

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      expect(emailPageTitle).toEqual(enterEmailPage.emailTitleText());
    });
  });

  test.describe('RDR-017 - Valid JWT but accountProvider=INVALID', () => {
    test('User should see show error message “service not available”', async ({
      page,
    }) => {
      // Arrange
      const errorPage = new ErrorPage(page);
      const membershipNumber = generateIdWithPrefix();
      const externalId = generateIdWithPrefix();
      const invalidAccountProvider = 'INVALID';

      const payload = {
        externalId,
        membershipNumber,
        accountProvider: invalidAccountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });

  test.describe('RDR-018 - Lounge code missing from URL', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);

      const payload = generateNewUser();
      const jwt = await signJWT(payload, secret);

      // Act
      await page.goto(`/?linkAccountToken=${jwt}`, {
        waitUntil: 'networkidle',
      });

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).toBeVisible({ timeout: 20000 });
    });
  });
});

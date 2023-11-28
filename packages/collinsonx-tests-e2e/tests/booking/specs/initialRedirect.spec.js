import { test, expect } from '../../../baseFixtures';
import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from '../utils/redirectToBaas';
import EnterEmailPage from '../pages/EnterEmailPage';
import ErrorPage from '../pages/ErrorPage';
import { v4 as uuidv4 } from 'uuid';
import { mailinatorAddress } from '../config';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';
const lounge = 'MAN6';
const accountProvider = 'PRIORITY_PASS';

test.describe('Initial Redirect to BAAS page', () => {
  test.describe('RDR-001 - Valid JWT and all mandatory fields', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);

      const membershipNumber = uuidv4();
      const externalId = uuidv4();
      const payload = {
        membershipNumber,
        externalId,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      await expect(emailPageTitle).toEqual('Enter your email');
    });
  });

  test.describe('RDR-002 - Valid JWT but missing membershipNumber', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);
      const externalId = uuidv4();

      const payload = {
        externalId,
        accountProvider,
      };

      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      await expect(emailPageTitle).toEqual('Enter your email');
    });
  });

  test.describe('RDR-003 - Valid JWT but missing accountProvider', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
      const payload = {
        membershipNumber,
        externalId,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('RDR-004 - Valid JWT but missing externalId', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);
      const membershipNumber = uuidv4();
      const payload = { membershipNumber, accountProvider };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('RDR-007 - Valid JWT and optional email', () => {
    test('should redirect successfully and user can see Enter your email page with the email pre-populated', async ({
      page,
    }) => {
      const enterEmailPage = new EnterEmailPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
      const id = uuidv4() + (process.env.ENV || 'test').toLowerCase();
      const email = `${id}@${mailinatorAddress}`;
      // Arrange
      const payload = {
        externalId,
        membershipNumber,
        accountProvider,
        email,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      const emailInputValue = await enterEmailPage.emailInputValue();
      await expect(emailPageTitle).toEqual('Enter your email');
      await expect(emailInputValue).toEqual(email);
    });
  });

  test.describe('RDR-008 - Valid JWT and optional firstName and lastName', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
      const firstName = 'Mac';
      const lastName = 'Mohan';

      const payload = {
        firstName,
        lastName,
        externalId,
        membershipNumber,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      await expect(emailPageTitle).toEqual('Enter your email');
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
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('RDR-015 - URL with lounge code for lounge that does not exist', () => {
    test('User can see error message “lounge not available”', async ({
      page,
    }) => {
      const errorPage = new ErrorPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
      const payload = {
        membershipNumber,
        externalId,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);
      const lounge = 'invalid';

      // Act
      await redirectToBaas(page, jwt, lounge);

      // Assert
      const errorElement = await errorPage.loungeNotAvailableError();
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('RDR-016 - URL with both valid and invalid parameters', () => {
    test('Redirection successful, but extra parameters ignored', async ({
      page,
    }) => {
      // Arrange
      const enterEmailPage = new EnterEmailPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();

      const payload = {
        externalId,
        membershipNumber,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      const url = `/?linkAccountToken=${jwt}&loungeCode=${lounge}&extra=xyz&ln=en`;
      await page.goto(url, {
        waitUntil: 'networkidle',
      });

      // Assert
      const emailPageTitle = await enterEmailPage.title();
      await expect(emailPageTitle).toEqual('Enter your email');
    });
  });

  test.describe('RDR-017 - Valid JWT but accountProvider=INVALID', () => {
    test('User should see show error message “service not available”', async ({
      page,
    }) => {
      // Arrange
      const errorPage = new ErrorPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
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
      await expect(errorElement).not.toBeNull();
    });
  });

  test.describe('RDR-018 - Lounge code missing from URL', () => {
    test('should redirect to service not available page', async ({ page }) => {
      // Arrange
      const errorPage = new ErrorPage(page);
      const membershipNumber = uuidv4();
      const externalId = uuidv4();

      const payload = {
        externalId,
        membershipNumber,
        accountProvider,
      };
      const jwt = await signJWT(payload, secret);

      // Act
      await page.goto(`/?linkAccountToken=${jwt}`, {
        waitUntil: 'networkidle',
      });

      // Assert
      const errorElement = await errorPage.serviceNotAvailableError();
      await expect(errorElement).not.toBeNull();
    });
  });
});

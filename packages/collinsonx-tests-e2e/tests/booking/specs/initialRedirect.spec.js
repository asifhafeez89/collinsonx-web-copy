
import { test } from '../../../baseFixtures';
import { encryptJWT } from '@collinsonx/jwt/dist';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

test.describe('Initial Redirect - current implementation', () => {
  test.describe('Valid JWT and all mandatory fields', () => {
    test('should redirect successfully', async ({ page }) => {
      // Arrange
      // const object = {
      //   sourceCode: '123',
      //   membershipNumber: '123',
      //   email: 'test@test.com',
      //   firstName: 'Alice',
      //   lastName: 'Smith',
      //   lounge: 'BHX7',
      //   membershipType: 'HSBC',
      //   accountProvider: 'PP',
      // };
      // const expirationTime = '12h';
      // const jwt = await encryptJWT(object, secret, expirationTime);
      const jwt = 'eyJhbGciOiJkaXIiLCJlbmMiOiJBMTI4Q0JDLUhTMjU2In0..EI5knUJN7A_LhdJ1tinypA.QgNzr6OaEBQVy5Fp-2kfz6-YRUN-HjjBS5StI2f0jx4dWCDTQP4jxmxZDuNM992gm45KSZpSi5ltGrOPUk8iQRQnRqf_QOZ6tN9aTHaid24Oz8cMxlB4DgCfC00YJAKRSjnTi5H2vQtWGyzYjKxX2v4tEeU3O1rr8R9Zk9nLIpr-muWLdagDt4GEnzLGwxAFXFI6melANLalgrQDhEr61JLgTGEW096aeFy7n1wOAYDT4-rQfuKh_spysMSTPWmf-Z_slm4vZS6BEJRiXDtJ7m51Vg-hRq7CWfKOPC5bXaJKY06N6RQBM8QhYMjrFvnMW-wEW6fHnhLpt1p_ggiseoY_Pfgguae_vIAJzmSObY0.uG12HSpaC_9GD0th3RoSGA';

      const lounge = 'BHX7';

      // Act
      await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

      // Assert
      // Redirection successful and user can see "Enter your email address" page
    });
  });
});

// test.describe('Initial Redirect', () => {
//   test.describe('Valid JWT and all mandatory fields', () => {
//     test('should redirect successfully', async ({ page }) => {
//       // Arrange
//       const object = {
//         consumerNumber: '123',
//         membershipNumber: '1234567890',
//         accountProvider: 'PP',
//       };
//       const expirationTime = '12h';
//       const jwt = await encryptJWT(object, secret, expirationTime);
//       const lounge = 'BHX7';

//       // Act
//       await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//       // Assert
//       // Redirection successful and user can see "Enter your email address" page
//     });
//   });

// test.describe('Valid JWT but missing membershipNumber', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange
//     const object = { consumerNumber: '123', accountProvider: 'PP' };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('Valid JWT but missing accountProvider', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange
//     const object = { consumerNumber: '123', accountProvider: 'PP' };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('Valid JWT but missing consumerNumber', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange
//     const object = { membershipNumber: '1234567890', accountProvider: 'PP' };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('Valid JWT with invalid expiration date', () => {
//   test('should redirect to not allowed booking page', async ({ page }) => {
//     // Arrange
//     const object = {
//       consumerNumber: '123',
//       membershipNumber: '1234567890',
//       accountProvider: 'PP',
//     };
//     // Change to invalid expiration date
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('Invalid JWT signature', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange
//     const object = {
//       consumerNumber: '123',
//       membershipNumber: '1234567890',
//       accountProvider: 'PP',
//     };
//     const expirationTime = '12h';
//     const secret = 'invalid';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('Valid JWT and optional email', () => {
//   test('should redirect successfully and user can see enter your email address page with the email pre-populated', async ({
//     page,
//   }) => {
//     // Arrange
//     const object = {
//       email: 'test@gmail.com',
//       membershipNumber: '1234567890',
//       accountProvider: 'PP',
//       consumerNumber: '123',
//     };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and user can see "Enter your email address" page with the email pre-populated
//   });
// });

// test.describe('Valid JWT and optional firstName and lastName', () => {
//   test('should redirect successfully', async ({ page }) => {
//     // Arrange
//     const object = {
//       firstName: 'Mac',
//       lastName: 'Mohan',
//       membershipNumber: '1234567890',
//       accountProvider: 'PP',
//       consumerNumber: '123',
//     };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and user can see "Enter your email address" page
//   });
// });

// test.describe('Valid JWT and accountProvider=PP', () => {
//   test('should redirect successfully and UI personalised with Priority Pass theme', async ({ page }) => {
//     // Arrange
//     const object = { "consumerNumber": "123", "membershipNumber": "1234567890", "accountProvider": "PP"};
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and UI personalised with Priority Pass theme
//   });
// });

// test.describe('Valid JWT and accountProvider=LK', () => {
//   test('should redirect successfully and UI personalised with Lounge Key theme', async ({ page }) => {
//     // Arrange
//     const object = { "consumerNumber": "123", "membershipNumber": "1234567890", "accountProvider": "LK"};
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and UI personalised with Lounge Key theme
//   });
// });

// test.describe('Valid JWT and membershipType=Mastercard', () => {
//   test('should redirect successfully and UI personalised with Mastercard theme', async ({ page }) => {
//     // Arrange
//     const object = { "membershipType": "Mastercard", "membershipNumber": "1234567890", "accountProvider": "PP", "consumerNumber": "123"  };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and UI personalised with Mastercard theme
//   });
// });

// test.describe('Valid JWT and membershipType=Mastercard_HSBC', () => {
//   test('should redirect successfully and UI personalised with Mastercard_HSBC theme', async ({ page }) => {
//     // Arrange
//     const object = { "membershipType": "Mastercard_HSBC", "membershipNumber": "1234567890", "accountProvider": "PP", "consumerNumber": "123" };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful and UI personalised with Mastercard_HSBC theme
//   });
// });

// test.describe('Direct access without JWT', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {

//     // Act
//     await page.goto(`/`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('URL with lounge code for lounge that does not exist', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange

//     const object = {
//       consumerNumber: '123',
//       membershipNumber: '1234567890',
//       accountProvider: 'PP',
//     };
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'INVALID';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Not allowed booking” page
//   });
// });

// test.describe('URL with both valid and invalid parameters', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange

//     const object = { "consumerNumber": "123", "membershipNumber": "1234567890", "accountProvider": "PP"};
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}&extra=xyz`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful
//   });
// });

// test.describe('None expired session', () => {
//   test('should redirect to the pre-booking page', async ({ page }) => {
//     // Arrange
//     // Need to find out a way to add session token to already registered user

//     const object = { "consumerNumber": "123", "membershipNumber": "1234567890", "accountProvider": "PP"};
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);
//     const lounge = 'BHX7';

//     // Act
//     await page.goto(`/?in=${jwt}&lc=${lounge}&extra=xyz`, { waitUntil: 'networkidle' });

//     // Assert
//     // Redirection successful to the pre-booking page
//   });
// });

// test.describe('Lounge code missing from URL', () => {
//   test('should redirect to not allowed booking” page', async ({ page }) => {
//     // Arrange
//     // Need to find out a way to add session token to already registered user

//     const object = { "consumerNumber": "123", "membershipNumber": "1234567890", "accountProvider": "PP"};
//     const expirationTime = '12h';
//     const jwt = await encryptJWT(object, secret, expirationTime);

//     // Act
//     await page.goto(`/?in=${jwt}`, { waitUntil: 'networkidle' });

//     // Assert
//     // User can see “Lounge does not exist” page
//   });
// });
// });

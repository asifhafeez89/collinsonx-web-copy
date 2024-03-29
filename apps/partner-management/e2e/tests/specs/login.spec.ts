import { test, expect } from '../baseFixtures';
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import SignUp from '../utils/SignUp';
import { v4 as uuidv4 } from 'uuid';
import Helper from '../helpers/Helper';
import TestSetup from '../utils/TestSetup';
import { BasicAuth } from '../types/Authentication';

let partnerDetails: BasicAuth;
let lounge: TestSetup;
let loginPage: LoginPage;

test.beforeEach(async ({ page, request }) => {
  lounge = new TestSetup(request);
  partnerDetails = await lounge.setup();
  loginPage = new LoginPage(page);
});

test.afterEach(async () => {
  await lounge.teardown();
});

test.describe('login page', () => {
  test('login as an existing partner', async ({ page }) => {
    const bookingOverviewPage = new BookingOverviewPage(page);

    await loginPage.login(partnerDetails.username, partnerDetails.password);

    const title = bookingOverviewPage.title();
    const pendingRequestsTitle = bookingOverviewPage.pendingRequestsTitle();
    const cancelledBookingsTitle = bookingOverviewPage.cancelledBookingsTitle();
    const confirmedBookingsTitle = bookingOverviewPage.confirmedBookingsTitle();
    const walkupQRcodeTitle = bookingOverviewPage.walkupQRcodeTitle();
    const loungeTitle = bookingOverviewPage.loungeTitle();

    await expect(title).toBeVisible();
    await expect(loungeTitle).toBeVisible();
    await expect(pendingRequestsTitle).toBeVisible();
    await expect(cancelledBookingsTitle).toBeVisible();
    await expect(confirmedBookingsTitle).toBeVisible();
    await expect(walkupQRcodeTitle).toBeVisible();
  });

  // skip test until implemented - currently the user is not redirected to the login page with the error displayed
  test.skip('receive error notification of pre-existing registration and get taken to login page', async ({
    page,
  }) => {
    const helper = new Helper(page);
    const signUp = new SignUp();
    const signUpPage = new SignUpPage(page);

    signUp.receiveRegistrationEmail(lounge, partnerDetails.username);
    // TODO: refactor 'wait' for ensuring the email has been sent before proceeding
    await helper.wait(5000);
    const signUpURL = await signUp.getRegistrationURL(partnerDetails.username);
    await page.goto(signUpURL);

    await signUpPage.acceptCookieBanner();
    await signUpPage.fillInDetails(
      partnerDetails.username,
      partnerDetails.password
    );

    await expect(signUpPage.errorMessageExistingUser()).toBeVisible();
    await expect(loginPage.title()).toBeVisible();
  });
});

// Cannot currently be tested against the local version - uat api sends a test env registration url (mismatched environments)
test('login as a new partner', async ({ page }) => {
  const bookingOverviewPage = new BookingOverviewPage(page);
  const helper = new Helper(page);
  const signUp = new SignUp();
  const signUpPage = new SignUpPage(page);

  const email = `${uuidv4()}@${process.env.MAILINATOR_EMAIL_ADDRESS}`;
  const password = uuidv4();

  signUp.receiveRegistrationEmail(lounge, email);
  // TODO: refactor 'wait' for ensuring the email has been sent before proceeding
  await helper.wait(5000);
  const signUpURL = await signUp.getRegistrationURL(email);
  await page.goto(signUpURL);

  await signUpPage.acceptCookieBanner();
  // TODO: currently after filling in the details you are taken to the partner.test.cergea.com page, not the local one!
  await signUpPage.fillInDetails(email, password);

  const title = bookingOverviewPage.title();
  const pendingRequestsTitle = bookingOverviewPage.pendingRequestsTitle();
  const cancelledBookingsTitle = bookingOverviewPage.cancelledBookingsTitle();
  const confirmedBookingsTitle = bookingOverviewPage.confirmedBookingsTitle();
  const walkupQRcodeTitle = bookingOverviewPage.walkupQRcodeTitle();
  const loungeTitle = bookingOverviewPage.loungeTitle();

  await expect(title).toBeVisible();
  await expect(loungeTitle).toBeVisible();
  await expect(pendingRequestsTitle).toBeVisible();
  await expect(cancelledBookingsTitle).toBeVisible();
  await expect(confirmedBookingsTitle).toBeVisible();
  await expect(walkupQRcodeTitle).toBeVisible();
});

const { test, expect } = require('@playwright/test');
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import SignUp from '../utils/SignUp';
import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helpers/Helper';

test.use({ storageState: { cookies: [], origins: [] } });

test('login as a current partner', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookingOverviewPage = new BookingOverviewPage(page);

    // password will be changed and added to secret variables at a later date
    const email = `automationuserpartner@clearrouteteam.testinator.com`;
    const password = process.env.ENV === "UAT" ? "CollinsonXPartner123" : "CollinsonXpartner123"

    await loginPage.login(email, password);

    const title = bookingOverviewPage.getPageTitle();
    const pendingRequestsTitle = bookingOverviewPage.getPendingRequestsTitle();
    const cancelledBookingsTitle = bookingOverviewPage.getCancelledBookingsTitle();
    const confirmedBookingsTitle = bookingOverviewPage.getConfirmedBookingsTitle();
    const walkupQRcodeTitle = bookingOverviewPage.getWalkupQRcodeTitle();
    const loungeTitle = bookingOverviewPage.getLoungeTitle();

    await expect(title).toBeVisible({ timeout: 10000 });
    await expect(loungeTitle).toBeVisible();
    await expect(pendingRequestsTitle).toBeVisible();
    await expect(cancelledBookingsTitle).toBeVisible();
    await expect(confirmedBookingsTitle).toBeVisible();
    await expect(walkupQRcodeTitle).toBeVisible();
});

// Cannot currently be tested against the local version - uat api sends a test env registration url (mismatched environments)
test('login as a new partner', async ({ page }) => {
    const bookingOverviewPage = new BookingOverviewPage(page);
    const helper = new Helper(page);
    const signUp = new SignUp();
    const signUpPage = new SignUpPage(page);

    const partner = uuidv4();
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = uuidv4();

    signUp.receiveRegistrationEmail(email);
    // TODO: refactor 'wait' for ensuring the email has been sent before proceeding
    await helper.wait(5000);
    const signUpURL = await signUp.getRegistrationURL(partner);
    await page.goto(signUpURL);

    await signUpPage.acceptCookieBanner();
    await signUpPage.fillInDetails(email, password);

    const title = bookingOverviewPage.getPageTitle();
    const pendingRequestsTitle = bookingOverviewPage.getPendingRequestsTitle();
    const cancelledBookingsTitle = bookingOverviewPage.getCancelledBookingsTitle();
    const confirmedBookingsTitle = bookingOverviewPage.getConfirmedBookingsTitle();
    const walkupQRcodeTitle = bookingOverviewPage.getWalkupQRcodeTitle();
    const loungeTitle = bookingOverviewPage.getLoungeTitle();

    await expect(title).toBeVisible();
    await expect(loungeTitle).toBeVisible();
    await expect(pendingRequestsTitle).toBeVisible();
    await expect(cancelledBookingsTitle).toBeVisible();
    await expect(confirmedBookingsTitle).toBeVisible();
    await expect(walkupQRcodeTitle).toBeVisible();
});

test('receive error notification of pre-existing registration and get taken to login page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const helper = new Helper(page);
    const signUp = new SignUp();
    const signUpPage = new SignUpPage(page);

    const partner = "automationuserpartner";
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = process.env.ENV === "UAT" ? "CollinsonXPartner123" : "CollinsonXpartner123"

    signUp.receiveRegistrationEmail(email);
    // TODO: refactor 'wait' for ensuring the email has been sent before proceeding
    await helper.wait(5000);
    const signUpURL = await signUp.getRegistrationURL(partner);
    await page.goto(signUpURL);

    await signUpPage.acceptCookieBanner();
    await signUpPage.fillInDetails(email, password);

    await expect(signUpPage.errorMessageExistingUser()).toBeVisible();
    await expect(loginPage.title()).toBeVisible();
});
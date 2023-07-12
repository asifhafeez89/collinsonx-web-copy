const { test, expect } = require('@playwright/test');
import LoginPage from '../pages/LoginPage';
import SignUpPage from '../pages/SignUpPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import SignUp from '../utils/SignUp';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';
import { v4 as uuidv4 } from 'uuid';
import Helper from '../../helpers/Helper';

test('login as a current partner', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const bookingOverviewPage = new BookingOverviewPage(page);

    // password will be changed and added to secret variables at a later date
    const partner = "automationuserpartner";
    const email = `${partner}@clearrouteteam.testinator.com`;
    // CollinsonXPartner123 for uat, lowercase p for test domains
    const password = "CollinsonXPartner123";

    await loginPage.login(email, password);

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

test('login as a new partner', async ({ page }) => {
    const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);
    const helper = new Helper(page);
    const signUp = new SignUp();
    const signUpPage = new SignUpPage(page);

    const partner = uuidv4();
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = uuidv4();

    signUp.receiveRegistrationEmail(email);
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
    const helper = new Helper(page);
    const signUp = new SignUp();
    const signUpPage = new SignUpPage(page);
    const loginPage = new LoginPage(page);

    const partner = "automationuserpartner";
    const email = `${partner}@clearrouteteam.testinator.com`;
    const password = "CollinsonXPartner123";

    signUp.receiveRegistrationEmail(email);
    await helper.wait(5000);
    const signUpURL = await signUp.getRegistrationURL(partner);
    await page.goto(signUpURL);

    await signUpPage.acceptCookieBanner();
    await signUpPage.fillInDetails(email, password);

    await expect(signUpPage.errorMessageExistingUser()).toBeVisible();
    await expect(loginPage.title()).toBeVisible();
});
import { test, expect } from '../baseFixtures';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import LoginPage from '../pages/LoginPage';
import LoungePage from '../pages/LoungePage';
import DashboardPage from '../pages/DashboardPage';
import PreBookPage from '../pages/PreBookPage';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import { getEmailAddress } from '../utils/loginUtils';
import { getPinFromEmail } from '../utils/emailUtils';
import { getOneMonthFromToday } from '../utils/dateUtils';
import { slotsGQLResponse, interceptGQLOperation } from '../utils/mockUtils';
import { Page } from '@playwright/test';

async function getPageObjectModel(page: Page) {
  return {
    enterEmailPage: new EnterEmailPage(page),
    enterPinPage: new EnterPinPage(page),
    preBookPage: new PreBookPage(page),
    selectLoungeTimePage: new SelectLoungeTimePage(page),
    confirmBookingPage: new ConfirmBookingPage(page),
  };
}

test.beforeEach(async ({ page }) => {
  // mock: gets through the available slots every time
  await interceptGQLOperation(page, 'GetAvailableSlots', slotsGQLResponse);
});

test.describe('Confirm booking flow in PP env', () => {
  test.describe('PPB-001 - Pre-Booking on PP Happy Path', () => {
    test('User should see booking confirmation message', async ({ page }) => {
      // Arrange
      const startUrl =
        'https://prioritypass.inte.integration-te-collinson.com/login';
      const loungeUrl =
        'https://prioritypass.inte.integration-te-collinson.com/lounges/united-kingdom/belfast-city/bhd1-aspire-lounge';
      const existingUsername = 'alreadyregisteredconsumerwithlinkaccount33'; // specify username
      const existingUserPassword = '******'; // specify password
      const flightNumber = 'BA1417';
      // email must be linked to username
      const email = getEmailAddress(existingUsername);

      // open login page
      await page.goto(startUrl, {
        waitUntil: 'networkidle',
      });

      const loginPage = new LoginPage(page);
      await loginPage.clickAcceptAllCookies();
      await loginPage.openSignInOption();
      await loginPage.inputUsername(existingUsername);
      await loginPage.inputPassword(existingUserPassword);
      await loginPage.clickSubmit();

      // assers we logged in
      const dashboardPage = new DashboardPage(page);
      const welcomeTextMessage = await dashboardPage.getWelcomeTextMessage();
      await expect(welcomeTextMessage).toBeVisible();

      // go to lounge pre-booking
      await page.goto(loungeUrl, {
        waitUntil: 'networkidle',
      });

      const loungePage = new LoungePage(page);
      await loungePage.clickPrebook();

      // set iFrame
      const iframeHandle = await page.waitForSelector(
        'iframe[id="loungePrebook"]'
      );
      const iframe: any = await iframeHandle.contentFrame();

      // get pages objects
      const {
        enterEmailPage,
        enterPinPage,
        preBookPage,
        selectLoungeTimePage,
        confirmBookingPage,
      } = await getPageObjectModel(iframe);

      // enter email and receive pin code
      enterEmailPage.enterEmail(email);
      await enterEmailPage.clickContinue();
      await page.waitForTimeout(10000);
      const pinCode = await getPinFromEmail(email);

      const pinInputSelector = `[data-testid="pinInput"] >> div:first-child > input:first-child`;
      const pinInput = iframe.locator(pinInputSelector);
      await pinInput.click();
      await pinInput.fill(pinCode);

      await enterPinPage.clickVerify();

      // pre-booking
      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      await selectLoungeTimePage.openLoungeTimeDropdown();
      await selectLoungeTimePage.selectFirstLoungeTime();
      await selectLoungeTimePage.clickConfirmButton();

      // // Assert confirm Booking Page
      const dateSelected = await confirmBookingPage.dateSelected(
        oneMonthFromNow.String
      );

      const confirmedFlightNumber = await confirmBookingPage.flightNumber(
        flightNumber
      );
      const whosComing = await confirmBookingPage.whosComing('Adults 2');

      await expect(confirmedFlightNumber).toBeVisible();
      await expect(dateSelected).toBeVisible();
      await expect(whosComing).toBeVisible();
    });
  });
});

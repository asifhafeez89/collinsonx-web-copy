const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import DeclinedBookingsPage from '../pages/DeclinedBookingsPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import TestSetup from '../utils/TestSetup.js';
import LoginPage from '../pages/LoginPage';
import { BookingStatus } from '@collinsonx/utils';

let partnerDetails;
let lounge;
let loginPage;

test.beforeEach(async ({ page, request }) => {
  lounge = new TestSetup(request);
  partnerDetails = await lounge.setup();
  loginPage = new LoginPage(page);
  await loginPage.login(partnerDetails.email, partnerDetails.password);
});

test.afterEach(async () => {
  await lounge.teardown();
});

test.describe('declined bookings page', () => {
  test('navigate to declined bookings page and validate declined bookings are for the correct lounge', async ({
    page,
  }) => {
    const bookingApi = new BookingApi(page);
    const bookingOverviewPage = new BookingOverviewPage(page);
    const declinedBookingsPage = new DeclinedBookingsPage(page);

    await bookingApi.addDeclinedBooking(lounge);

    await page.goto('/', { waitUntil: 'domcontentloaded' });

    await bookingOverviewPage.viewAllDeclined();

    const statusBookings = await bookingApi.getBookings(
      lounge,
      BookingStatus.Declined
    );

    await expect(declinedBookingsPage.title()).toBeVisible();

    // validate all declined bookings from the api are correctly displayed on the UI
    for (const booking of statusBookings) {
      let reference = booking.reference;
      await expect(page.getByText(reference)).toBeVisible();
    }
  });
});

import { test, expect } from '../baseFixtures';
import BookingApi from '../utils/BookingApi';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';
import TestSetup from '../utils/TestSetup';
import LoginPage from '../pages/LoginPage';
import { BookingStatus } from '@collinsonx/utils';

let partnerDetails;
let lounge: TestSetup;
let loginPage;

test.beforeEach(async ({ page, request }) => {
  lounge = new TestSetup(request);
  partnerDetails = await lounge.setup();
  loginPage = new LoginPage(page);
  await loginPage.login(partnerDetails.username, partnerDetails.password);
});

test.afterEach(async () => {
  await lounge.teardown();
});

test.describe('all confirmed bookings page', () => {
  test.describe('resolving confirmed bookings', () => {
    test('customer should be checked in after clicking the "Check customer in" button', async ({
      page,
    }) => {
      const bookingApi = new BookingApi(page);

      const { bookingRef, bookingId } = await bookingApi.addConfirmedBooking(
        lounge
      );

      const allConfirmedBookingsPage = new AllConfirmedBookingsPage(
        page,
        bookingRef
      );

      const confirmedBooking = BookingStatus.Confirmed;
      const checkedInBooking = BookingStatus.CheckedIn;

      const initialConfirmedCount = await bookingApi.getBookingCount(
        lounge,
        confirmedBooking
      );
      const initialCheckedInCount = await bookingApi.getBookingCount(
        lounge,
        checkedInBooking
      );

      await page.goto('/bookings/confirmed', { waitUntil: 'domcontentloaded' });

      await allConfirmedBookingsPage.checkCustomerIn();

      await allConfirmedBookingsPage.waitForCheckedInElement();

      const finalConfirmedCount = await bookingApi.getBookingCount(
        lounge,
        confirmedBooking
      );
      const finalCheckedInCount = await bookingApi.getBookingCount(
        lounge,
        checkedInBooking
      );

      const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

      expect(finalConfirmedCount).toBe(initialConfirmedCount - 1);
      expect(finalCheckedInCount).toBe(initialCheckedInCount + 1);
      expect(bookingStatus).toBe(checkedInBooking);
    });
  });
});

import { test, expect } from '../../../baseFixtures';
import BookingApi from '../utils/BookingApi';
import PendingRequestsPage from '../pages/PendingRequestsPage';
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

test.describe('pending requests page', () => {
  test.describe('resolving pending requests', () => {
    test.describe('decline pending request', () => {
      test('pending request should be removed from the UI and its status updated to "declined" in the backend', async ({
        page,
      }) => {
        const bookingApi = new BookingApi(page);
        const pendingRequestsPage = new PendingRequestsPage(page);

        const booking = await bookingApi.addPendingRequest(lounge);
        const bookingRef = booking.bookingRef;
        const bookingId = booking.bookingId;

        const initialPendingCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );
        const initialDeclinedCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Declined
        );

        await page.goto('/bookings/pending', { waitUntil: 'domcontentloaded' });

        await pendingRequestsPage.declinePendingRequest(bookingRef);

        await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

        const finalPendingCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );
        const finalDeclinedCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Declined
        );

        const bookingStatus = (await bookingApi.getBookingById(bookingId))
          .status;

        expect(finalPendingCount).toBe(initialPendingCount - 1);
        expect(finalDeclinedCount).toBe(initialDeclinedCount + 1);
        expect(bookingStatus).toBe(BookingStatus.Declined);
      });
    });
    test.describe('confirm pending request', () => {
      test('pending request should be removed from the UI and its status updated to "confirmed" in the backend', async ({
        page,
        request,
      }) => {
        const bookingApi = new BookingApi(page);
        const pendingRequestsPage = new PendingRequestsPage(page);

        const booking = await bookingApi.addPendingRequest(lounge);
        const bookingRef = booking.bookingRef;
        const bookingId = booking.bookingId;

        const initialPendingCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );
        const initialConfirmedCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Confirmed
        );

        await page.goto('/bookings/pending', { waitUntil: 'domcontentloaded' });

        await pendingRequestsPage.confirmPendingRequest(bookingRef);

        await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

        const finalPendingCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );
        const finalConfirmedCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Confirmed
        );

        const bookingStatus = (await bookingApi.getBookingById(bookingId))
          .status;

        expect(finalPendingCount).toBe(initialPendingCount - 1);
        expect(finalConfirmedCount).toBe(initialConfirmedCount + 1);
        expect(bookingStatus).toBe(BookingStatus.Confirmed);
      });
    });
  });

  test.describe('compare UI data to API data', () => {
    test('validate pending requests are for the correct lounge', async ({
      page,
    }) => {
      const bookingApi = new BookingApi(page);
      const pendingRequestsPage = new PendingRequestsPage(page);

      await bookingApi.addPendingRequest(lounge);

      await page.goto('/bookings/pending', { waitUntil: 'domcontentloaded' });

      const statusBookings = await bookingApi.getBookings(
        lounge,
        BookingStatus.Pending
      );

      expect(pendingRequestsPage.title()).toBeVisible();

      // validate all lounge bookings from the api are correctly displayed on the UI
      for (const booking of statusBookings) {
        let reference = booking.reference;
        await expect(page.getByText(reference)).toBeVisible();
      }
    });
  });
});

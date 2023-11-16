import { test, expect } from '../baseFixtures';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';
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

test.describe('booking overview dashboard', () => {
  test.describe('pending requests', () => {
    test.describe('add pending request using the booking API', () => {
      test('should increase the booking count by 1', async ({ page }) => {
        const bookingOverviewPage = new BookingOverviewPage(page);
        const bookingApi = new BookingApi(page);

        const initialCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );

        await bookingApi.addPendingRequest(lounge);

        await page.goto('/', { waitUntil: 'networkidle' });

        const latestCount = await bookingOverviewPage.getPendingRequestCount();

        expect(latestCount).toBe(initialCount + 1);
      });
    });
    test.describe('remove pending request using the booking API', () => {
      test('should decrease the booking count by 1', async ({ page }) => {
        const bookingOverviewPage = new BookingOverviewPage(page);
        const bookingApi = new BookingApi(page);

        const { bookingId } = await bookingApi.addPendingRequest(lounge);

        let initialCount = await bookingApi.getBookingCount(
          lounge,
          BookingStatus.Pending
        );

        // requires atleast 2 bookings so that there is atleast 1 leftover for the assertion
        if (initialCount === 1) {
          await bookingApi.addPendingRequest(lounge);
          initialCount = await bookingApi.getBookingCount(
            lounge,
            BookingStatus.Pending
          );
        }

        await bookingApi.deleteBooking(bookingId);

        await page.goto('/', { waitUntil: 'networkidle' });

        const latestCount = await bookingOverviewPage.getPendingRequestCount();

        expect(latestCount).toBe(initialCount - 1);
      });
    });
  });

  test.describe('confirmed bookings', () => {
    test('add confirmed booking using the booking API should increase the booking count by 1', async ({
      page,
    }) => {
      const bookingOverviewPage = new BookingOverviewPage(page);
      const bookingApi = new BookingApi(page);

      const initialCount = await bookingApi.getBookingCount(
        lounge,
        BookingStatus.Confirmed,
        BookingStatus.CheckedIn
      );

      await bookingApi.addConfirmedBooking(lounge);

      await page.goto('/', { waitUntil: 'networkidle' });

      const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

      expect(latestCount).toBe(initialCount + 1);
    });
  });
});

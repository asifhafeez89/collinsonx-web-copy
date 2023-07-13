const { test } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';

test.describe.skip('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test('add pending request using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();

            await page.goto('/');
            await page.reload({ waitUntil: "domcontentloaded" });

            const initialCount = await bookingApi.getBookingCount("PENDING");

            await bookingApi.addPendingRequest();
            await page.reload({ waitUntil: "domcontentloaded" });

            const latestCount = await bookingOverviewPage.getPendingRequestCount();

            expect(latestCount).toHaveText(initialCount + 1);
        });

        test('remove pending request using the booking API should decrease the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();

            await page.goto('/');

            await page.reload({ waitUntil: "domcontentloaded" });

            const bookingId = await bookingApi.addPendingRequest();

            const initialCount = await bookingApi.getBookingCount("PENDING");

            await page.reload({ waitUntil: "domcontentloaded" });

            await bookingApi.deleteBooking(bookingId);

            const latestCount = await bookingOverviewPage.getPendingRequestCount();

            expect(latestCount).toHaveText(initialCount - 1);
        });
    });

    test.describe('confirmed bookings', () => {
        test('add confirmed booking using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();

            await page.goto('/');
            await page.reload({ waitUntil: "domcontentloaded" });

            const initialCount = await bookingApi.getBookingCount("CONFIRMED");

            await bookingApi.addConfirmedBooking();
            await page.reload({ waitUntil: "domcontentloaded" });

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toHaveText(initialCount + 1);
        });
    });
});
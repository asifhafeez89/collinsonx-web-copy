const { test, expect } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.describe('add pending request using the booking API', () => {
            test.use({ storageState: 'playwright/.auth/heathrowUser.json' })

            test('should increase the booking count by 1', async ({ page }) => {

                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                await page.goto('/');
                await page.reload({ waitUntil: "domcontentloaded" });
                await page.waitForLoadState('networkidle')

                const initialCount = await bookingApi.getBookingCount("PENDING");

                await bookingApi.addPendingRequest();

                await page.goto('/');
                await page.waitForLoadState('networkidle')

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount + 1);
            });
        });
        test.describe('remove pending request using the booking API', () => {
            test('should decrease the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                await page.goto('/');
                await page.reload({ waitUntil: "domcontentloaded" });
                await page.waitForLoadState('networkidle')

                const bookingId = (await bookingApi.addPendingRequest()).bookingId;

                await page.goto('/');
                await page.waitForLoadState('networkidle')

                const initialCount = await bookingApi.getBookingCount("PENDING");

                await bookingApi.deleteBooking(bookingId);

                await page.reload({ waitUntil: "domcontentloaded" });
                await page.waitForLoadState('networkidle')

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount - 1);
            });
        });

    });

    test.describe('confirmed bookings', () => {
        test('add confirmed booking using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi(page);

            await page.goto('/');
            await page.waitForLoadState('networkidle')

            const initialCount = await bookingApi.getBookingCount("CONFIRMED");

            await bookingApi.addConfirmedBooking();

            await page.goto('/');
            await page.waitForLoadState('networkidle')

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toBe(initialCount + 1);
        });
    });
});
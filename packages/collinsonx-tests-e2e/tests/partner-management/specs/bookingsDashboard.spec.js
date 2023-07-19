const { test, expect } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.describe('add pending request using the booking API', () => {
            const user = "HEATHROW";
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('should increase the booking count by 1', async ({ page }) => {

                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                await page.goto('/');
                await page.reload({ waitUntil: "domcontentloaded" });

                const initialCount = await bookingApi.getBookingCount(user, "PENDING");

                await bookingApi.addPendingRequest(user);

                await page.goto('/');
                await page.waitForLoadState('networkidle')

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount + 1);
            });
        });
        test.describe('remove pending request using the booking API', () => {
            const user = "GATWICK";
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('should decrease the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                await page.goto('/');
                await page.reload({ waitUntil: "domcontentloaded" });

                const bookingId = (await bookingApi.addPendingRequest(user)).bookingId;

                await page.goto('/');
                await page.waitForLoadState('networkidle')

                const initialCount = await bookingApi.getBookingCount(user, "PENDING");

                await bookingApi.deleteBooking(bookingId);

                await page.reload({ waitUntil: "domcontentloaded" });
                await page.waitForLoadState('networkidle')

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount - 1);
            });
        });

    });

    test.describe('confirmed bookings', () => {
        const user = "BIRMINGHAM";
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('add confirmed booking using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi(page);

            await page.goto('/');
            await page.waitForLoadState('networkidle')

            const initialCount = await bookingApi.getBookingCount(user, "CONFIRMED");

            await bookingApi.addConfirmedBooking(user);

            await page.goto('/');
            await page.waitForLoadState('networkidle')

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toBe(initialCount + 1);
        });
    });
});
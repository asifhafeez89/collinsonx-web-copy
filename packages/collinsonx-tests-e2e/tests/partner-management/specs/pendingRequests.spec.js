const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import PendingRequestsPage from '../pages/PendingRequestsPage';

test.describe('pending requests page', () => {
    test.describe('compare UI data to API data', () => {
        const user = "HEATHROW_TERMINAL_3";
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('validate pending requests are for the correct lounge', async ({ page }) => {
            const bookingApi = new BookingApi(page);
            const pendingRequestsPage = new PendingRequestsPage(page);

            await bookingApi.addPendingRequest(user);

            await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

            const statusBookings = await bookingApi.getBookings(user, "PENDING");

            expect(pendingRequestsPage.title()).toBeVisible();

            // validate all lounge bookings from the api are correctly displayed on the UI
            for (const booking of statusBookings) {
                let reference = booking.reference
                await expect(page.getByText(reference)).toBeVisible();
            };

        });
    });
});
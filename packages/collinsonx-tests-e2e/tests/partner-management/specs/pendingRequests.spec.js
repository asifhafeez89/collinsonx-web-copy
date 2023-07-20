const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import PendingRequestsPage from '../pages/PendingRequestsPage';

test.describe('pending requests page', () => {
    test.describe('resolving pending requests', () => {
        const user = "BIRMINGHAM";
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('decline pending request', async ({ page }) => {
            const bookingApi = new BookingApi(page);
            const pendingRequestsPage = new PendingRequestsPage(page);

            const bookingRef = (await bookingApi.addPendingRequest(user)).bookingRef;

            const initialPendingCount = await bookingApi.getBookingCount(user, "PENDING");
            const initialDeclinedCount = await bookingApi.getBookingCount(user, "DECLINED");

            await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

            await pendingRequestsPage.declinePendingRequest(bookingRef);

            const finalPendingCount = await bookingApi.getBookingCount(user, "PENDING");
            const finalDeclinedCount = await bookingApi.getBookingCount(user, "DECLINED");

            expect(finalPendingCount).toBe(initialPendingCount - 1);
            expect(finalDeclinedCount).toBe(initialDeclinedCount + 1);
        });
    });
});
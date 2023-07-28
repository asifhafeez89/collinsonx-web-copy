const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import PendingRequestsPage from '../pages/PendingRequestsPage';
import { users } from '../utils/config';

test.describe('pending requests page', () => {
    test.describe('resolving pending requests', () => {
        test.describe('decline pending request', () => {
            const user = users[5];
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('pending request should be removed from the UI and its status updated to "declined" in the backend', async ({ page }) => {
                const bookingApi = new BookingApi(page);
                const pendingRequestsPage = new PendingRequestsPage(page);

                const booking = await bookingApi.addPendingRequest(user);
                const bookingRef = booking.bookingRef;
                const bookingId = booking.bookingId;

                const initialPendingCount = await bookingApi.getBookingCount(user, "PENDING");
                const initialDeclinedCount = await bookingApi.getBookingCount(user, "DECLINED");

                await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

                await pendingRequestsPage.declinePendingRequest(bookingRef);

                await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

                const finalPendingCount = await bookingApi.getBookingCount(user, "PENDING");
                const finalDeclinedCount = await bookingApi.getBookingCount(user, "DECLINED");

                const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

                expect(finalPendingCount).toBe(initialPendingCount - 1);
                expect(finalDeclinedCount).toBe(initialDeclinedCount + 1);
                expect(bookingStatus).toBe("DECLINED");
            });
        });
        test.describe('confirm pending request', () => {
            const user = users[6];
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('pending request should be removed from the UI and its status updated to "confirmed" in the backend', async ({ page }) => {
                const bookingApi = new BookingApi(page);
                const pendingRequestsPage = new PendingRequestsPage(page);

                const booking = await bookingApi.addPendingRequest(user);
                const bookingRef = booking.bookingRef;
                const bookingId = booking.bookingId;

                const initialPendingCount = await bookingApi.getBookingCount(user, "PENDING");
                const initialConfirmedCount = await bookingApi.getBookingCount(user, "CONFIRMED");

                await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

                await pendingRequestsPage.confirmPendingRequest(bookingRef);

                await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

                const finalPendingCount = await bookingApi.getBookingCount(user, "PENDING");
                const finalConfirmedCount = await bookingApi.getBookingCount(user, "CONFIRMED");

                const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

                expect(finalPendingCount).toBe(initialPendingCount - 1);
                expect(finalConfirmedCount).toBe(initialConfirmedCount + 1);
                expect(bookingStatus).toBe("CONFIRMED");
            });
        });
    });

    test.describe('compare UI data to API data', () => {
        const user = users[7];
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
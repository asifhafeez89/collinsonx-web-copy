const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import PendingRequestsPage from '../pages/PendingRequestsPage';
import { loungeMap } from '../utils/config';

test.describe('pending requests page', () => {
    test.describe('resolving pending requests', () => {
        test.describe('decline pending request', () => {
            const lounge = loungeMap.get("lounge6");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
            test('pending request should be removed from the UI and its status updated to "declined" in the backend', async ({ page }) => {
                const bookingApi = new BookingApi(page);
                const pendingRequestsPage = new PendingRequestsPage(page);

                const booking = await bookingApi.addPendingRequest(lounge);
                const bookingRef = booking.bookingRef;
                const bookingId = booking.bookingId;

                const initialPendingCount = await bookingApi.getBookingCount(lounge, "PENDING");
                const initialDeclinedCount = await bookingApi.getBookingCount(lounge, "DECLINED");

                await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

                await pendingRequestsPage.declinePendingRequest(bookingRef);

                await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

                const finalPendingCount = await bookingApi.getBookingCount(lounge, "PENDING");
                const finalDeclinedCount = await bookingApi.getBookingCount(lounge, "DECLINED");

                const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

                expect(finalPendingCount).toBe(initialPendingCount - 1);
                expect(finalDeclinedCount).toBe(initialDeclinedCount + 1);
                expect(bookingStatus).toBe("DECLINED");
            });
        });
        test.describe('confirm pending request', () => {
            const lounge = loungeMap.get("lounge7");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
            test('pending request should be removed from the UI and its status updated to "confirmed" in the backend', async ({ page }) => {
                const bookingApi = new BookingApi(page);
                const pendingRequestsPage = new PendingRequestsPage(page);

                const booking = await bookingApi.addPendingRequest(lounge);
                const bookingRef = booking.bookingRef;
                const bookingId = booking.bookingId;

                const initialPendingCount = await bookingApi.getBookingCount(lounge, "PENDING");
                const initialConfirmedCount = await bookingApi.getBookingCount(lounge, "CONFIRMED");

                await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

                await pendingRequestsPage.confirmPendingRequest(bookingRef);

                await pendingRequestsPage.waitForPendingRequestToBeRemoved(bookingRef);

                const finalPendingCount = await bookingApi.getBookingCount(lounge, "PENDING");
                const finalConfirmedCount = await bookingApi.getBookingCount(lounge, "CONFIRMED");

                const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

                expect(finalPendingCount).toBe(initialPendingCount - 1);
                expect(finalConfirmedCount).toBe(initialConfirmedCount + 1);
                expect(bookingStatus).toBe("CONFIRMED");
            });
        });
    });

    test.describe('compare UI data to API data', () => {
        const lounge = loungeMap.get("lounge8");
        test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
        test('validate pending requests are for the correct lounge', async ({ page }) => {
            const bookingApi = new BookingApi(page);
            const pendingRequestsPage = new PendingRequestsPage(page);

            await bookingApi.addPendingRequest(lounge);

            await page.goto('/bookings/pending', { waitUntil: "domcontentloaded" });

            const statusBookings = await bookingApi.getBookings(lounge, "PENDING");

            expect(pendingRequestsPage.title()).toBeVisible();

            // validate all lounge bookings from the api are correctly displayed on the UI
            for (const booking of statusBookings) {
                let reference = booking.reference
                await expect(page.getByText(reference)).toBeVisible();
            };

        });
    });
});
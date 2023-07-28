const { test, expect } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';
import { users } from '../utils/users';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.describe('add pending request using the booking API', () => {
            const user = users[0];
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('should increase the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                const initialCount = await bookingApi.getBookingCount(user, "PENDING");

                await bookingApi.addPendingRequest(user);

                await page.goto('/', { waitUntil: "networkidle" });

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount + 1);
            });
        });
        test.describe('remove pending request using the booking API', () => {
            const user = users[1];
            test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
            test('should decrease the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                const bookingId = (await bookingApi.addPendingRequest(user)).bookingId;

                const initialCount = await bookingApi.getBookingCount(user, "PENDING");

                await bookingApi.deleteBooking(bookingId);

                await page.goto('/', { waitUntil: "networkidle" });

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount - 1);
            });
        });

    });

    test.describe('confirmed bookings', () => {
        const user = users[2];
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('add confirmed booking using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi(page);

            const initialCount = await bookingApi.getBookingCount(user, 'CONFIRMED', 'CHECKED_IN');

            await bookingApi.addConfirmedBooking(user);

            await page.goto('/', { waitUntil: "networkidle" });

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toBe(initialCount + 1);
        });
    });
});
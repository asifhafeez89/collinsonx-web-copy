import { test, expect } from '../../../baseFixtures';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../utils/BookingApi';
import { loungeMap } from '../utils/config';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.describe('add pending request using the booking API', () => {
            const lounge = loungeMap.get("lounge1");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
            test('should increase the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                const initialCount = await bookingApi.getBookingCount(lounge, "PENDING");

                await bookingApi.addPendingRequest(lounge);

                await page.goto('/', { waitUntil: "networkidle" });

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount + 1);
            });
        });
        test.describe('remove pending request using the booking API', () => {
            const lounge = loungeMap.get("lounge2");
            test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
            test('should decrease the booking count by 1', async ({ page }) => {
                const bookingOverviewPage = new BookingOverviewPage(page);
                const bookingApi = new BookingApi(page);

                const bookingId = (await bookingApi.addPendingRequest(lounge)).bookingId;

                const initialCount = await bookingApi.getBookingCount(lounge, "PENDING");

                await bookingApi.deleteBooking(bookingId);

                await page.goto('/', { waitUntil: "networkidle" });

                const latestCount = await bookingOverviewPage.getPendingRequestCount();

                expect(latestCount).toBe(initialCount - 1);
            });
        });

    });

    test.describe('confirmed bookings', () => {
        const lounge = loungeMap.get("lounge3");
        test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
        test('add confirmed booking using the booking API should increase the booking count by 1', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi(page);

            const initialCount = await bookingApi.getBookingCount(lounge, 'CONFIRMED', 'CHECKED_IN');

            await bookingApi.addConfirmedBooking(lounge);

            await page.goto('/', { waitUntil: "networkidle" });

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toBe(initialCount + 1);
        });
    });
});
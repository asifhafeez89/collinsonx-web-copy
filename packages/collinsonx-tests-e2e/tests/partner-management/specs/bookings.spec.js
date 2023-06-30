const { test } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../actions/BookingApi';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test('add pending request', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();
            const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

            await page.goto('https://partner.test.cergea.com/');
            await page.reload({ waitUntil: "domcontentloaded" });

            await expectPartnerToBeLoggedIn.ask();

            const initialCount = await bookingApi.getBookingCount("PENDING");

            await bookingApi.addPendingRequest();
            await page.reload();

            const latestCount = await bookingOverviewPage.getPendingRequestCount();

            expect(latestCount).toHaveText(initialCount + 1);
        });

        test('remove pending request', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();
            const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

            await page.goto('https://partner.test.cergea.com/');

            await page.reload({ waitUntil: "domcontentloaded" });

            await expectPartnerToBeLoggedIn.ask();

            const bookingId = await bookingApi.addPendingRequest();

            const initialCount = await bookingApi.getBookingCount("PENDING");

            await page.reload({ waitUntil: "domcontentloaded" });

            await bookingApi.deleteBooking(bookingId);

            const latestCount = await bookingOverviewPage.getPendingRequestCount();

            expect(latestCount).toHaveText(initialCount - 1);
        });
    });

    test.describe('confirmed bookings', () => {
        test('add confirmed booking', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();
            const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

            await page.goto('https://partner.test.cergea.com/');
            await page.reload({ waitUntil: "domcontentloaded" });

            await expectPartnerToBeLoggedIn.ask();

            const initialCount = await bookingApi.getBookingCount("CONFIRMED");

            await bookingApi.addConfirmedBooking();
            await page.reload({ waitUntil: "domcontentloaded" });

            const latestCount = await bookingOverviewPage.getConfirmedBookingCount();

            expect(latestCount).toHaveText(initialCount + 1);
        });
    });
});
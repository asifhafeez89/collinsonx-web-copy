const { test } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import BookingApi from '../actions/BookingApi';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';

test.describe('booking overview dashboard', () => {
    test.describe('pending requests', () => {
        test.only('add pending request', async ({ page }) => {
            const bookingOverviewPage = new BookingOverviewPage(page);
            const bookingApi = new BookingApi();
            const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

            await page.goto('https://partner.test.cergea.com/');
            await page.reload({ waitUntil: "domcontentloaded" });

            await expectPartnerToBeLoggedIn.ask();

            const initialCount = await bookingApi.getPendingRequestCount();

            await bookingApi.addPendingRequest();
            await page.reload();

            const latestCount = await bookingOverviewPage.getPendingRequestCount();

            expect(latestCount).toHaveText(initialCount + 1);
        });
    })
})
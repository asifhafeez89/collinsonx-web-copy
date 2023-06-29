const { test } = require('@playwright/test');
import BookingOverviewPage from '../pages/BookingOverviewPage';
import ExpectPartnerToBeLoggedIn from '../assertions/ExpectPartnerToBeLoggedIn';

test.only('view all confirmed bookings', async ({ page }) => {
    const bookingOverviewPage = new BookingOverviewPage(page);
    const expectPartnerToBeLoggedIn = new ExpectPartnerToBeLoggedIn(page);

    await page.goto('https://partner.test.cergea.com/');
    await page.reload();

    await expectPartnerToBeLoggedIn.ask();
});
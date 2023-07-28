const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import DeclinedBookingsPage from '../pages/DeclinedBookingsPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';
import { users } from '../utils/users';

test.describe('declined bookings page', () => {
    const user = users[4];
    test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
    test('navigate to declined bookings page and validate declined bookings are for the correct lounge', async ({ page }) => {
        const bookingApi = new BookingApi(page);
        const bookingOverviewPage = new BookingOverviewPage(page);
        const declinedBookingsPage = new DeclinedBookingsPage(page);

        await bookingApi.addDeclinedBooking(user);

        await page.goto('/', { waitUntil: "domcontentloaded" });

        await bookingOverviewPage.viewAllDeclined();

        const statusBookings = await bookingApi.getBookings(user, "DECLINED");

        await expect(declinedBookingsPage.title()).toBeVisible();

        // validate all declined bookings from the api are correctly displayed on the UI
        for (const booking of statusBookings) {
            let reference = booking.reference
            await expect(page.getByText(reference)).toBeVisible();
        };
    });
});
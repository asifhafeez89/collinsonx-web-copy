const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';
import { users } from '../utils/users';

test.describe('all confirmed bookings page', () => {
    test.describe('resolving confirmed bookings', () => {
        const user = users[3];
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('customer should be checked in after clicking the "Check customer in" button', async ({ page }) => {
            const bookingApi = new BookingApi(page);

            const { bookingRef, bookingId } = await bookingApi.addConfirmedBooking(user);

            const allConfirmedBookingsPage = new AllConfirmedBookingsPage(page, bookingRef);

            const confirmedBooking = "CONFIRMED";
            const checkedInBooking = "CHECKED_IN";

            const initialConfirmedCount = await bookingApi.getBookingCount(user, confirmedBooking);
            const initialCheckedInCount = await bookingApi.getBookingCount(user, checkedInBooking);

            await page.goto('/bookings/confirmed', { waitUntil: "domcontentloaded" });

            await allConfirmedBookingsPage.checkCustomerIn(bookingRef);

            await allConfirmedBookingsPage.waitForCheckedInElement(bookingRef);

            const finalConfirmedCount = await bookingApi.getBookingCount(user, confirmedBooking);
            const finalCheckedInCount = await bookingApi.getBookingCount(user, checkedInBooking);

            const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

            expect(finalConfirmedCount).toBe(initialConfirmedCount - 1);
            expect(finalCheckedInCount).toBe(initialCheckedInCount + 1);
            expect(bookingStatus).toBe(checkedInBooking);
        });
    });
});
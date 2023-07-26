const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';

test.describe.only('all confirmed bookings page', () => {
    test.describe('resolving confirmed bookings', () => {
        const user = "HEATHROW_LOUNGE";
        test.use({ storageState: `playwright/.auth/${user.toLowerCase()}User.json` })
        test('customer should be checked in after clicking the "Check customer in" button', async ({ page }) => {
            const bookingApi = new BookingApi(page);

            const booking = await bookingApi.addConfirmedBooking(user);
            const bookingRef = booking.bookingRef;
            const bookingId = booking.bookingId;

            const allConfirmedBookingsPage = new AllConfirmedBookingsPage(page, bookingRef);

            const initialConfirmedCount = await bookingApi.getBookingCount(user, "CONFIRMED");
            const initialCheckedInCount = await bookingApi.getBookingCount(user, "CHECKED_IN");

            await page.goto('/bookings/confirmed', { waitUntil: "domcontentloaded" });

            await allConfirmedBookingsPage.checkCustomerIn(bookingRef);

            await allConfirmedBookingsPage.waitForCheckedInElement(bookingRef);

            const finalConfirmedCount = await bookingApi.getBookingCount(user, "CONFIRMED");
            const finalCheckedInCount = await bookingApi.getBookingCount(user, "CHECKED_IN");

            const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

            expect(finalConfirmedCount).toBe(initialConfirmedCount - 1);
            expect(finalCheckedInCount).toBe(initialCheckedInCount + 1);
            expect(bookingStatus).toBe("CHECKED_IN");
        });
    });
});
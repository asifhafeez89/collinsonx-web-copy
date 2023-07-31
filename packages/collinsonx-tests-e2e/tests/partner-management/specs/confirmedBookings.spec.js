const { test, expect } = require('@playwright/test');
import BookingApi from '../utils/BookingApi';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';
import { loungeMap } from '../utils/config';

test.describe('all confirmed bookings page', () => {
    test.describe('resolving confirmed bookings', () => {
        const lounge = loungeMap.get("lounge4");
        test.use({ storageState: `playwright/.auth/${lounge.toLowerCase()}User.json` })
        test('customer should be checked in after clicking the "Check customer in" button', async ({ page }) => {
            const bookingApi = new BookingApi(page);

            const { bookingRef, bookingId } = await bookingApi.addConfirmedBooking(lounge);

            const allConfirmedBookingsPage = new AllConfirmedBookingsPage(page, bookingRef);

            const confirmedBooking = "CONFIRMED";
            const checkedInBooking = "CHECKED_IN";

            const initialConfirmedCount = await bookingApi.getBookingCount(lounge, confirmedBooking);
            const initialCheckedInCount = await bookingApi.getBookingCount(lounge, checkedInBooking);

            await page.goto('/bookings/confirmed', { waitUntil: "domcontentloaded" });

            await allConfirmedBookingsPage.checkCustomerIn(bookingRef);

            await allConfirmedBookingsPage.waitForCheckedInElement(bookingRef);

            const finalConfirmedCount = await bookingApi.getBookingCount(lounge, confirmedBooking);
            const finalCheckedInCount = await bookingApi.getBookingCount(lounge, checkedInBooking);

            const bookingStatus = (await bookingApi.getBookingById(bookingId)).status;

            expect(finalConfirmedCount).toBe(initialConfirmedCount - 1);
            expect(finalCheckedInCount).toBe(initialCheckedInCount + 1);
            expect(bookingStatus).toBe(checkedInBooking);
        });
    });
});
import { test, expect } from '../../../baseFixtures';
import { getOneMonthFromToday } from '../utils/dateUtils';
import PreBookPage from '../pages/PreBookPage';
import PaymentConfirmationPage from '../pages/PaymentConfirmationPage';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import StripePaymentPage from '../pages/StripePaymentPage';
import EnterEmailPage from '../pages/EnterEmailPage';
import CancelBookingPage from '../pages/CancelBookingPage';
import CancelledBookingConfirmationPage from '../pages/CancelledBookingConfirmationPage';
import {
  loginAsExistingUser,
  getEmailAddress,
  getAndEnterPin,
} from '../utils/loginUtils';
import { getLinkFromEmail } from '../utils/emailUtils';

async function fillStripeIframe(stripePaymentPage, id) {
  await stripePaymentPage.inputEmail(getEmailAddress(id));
  await stripePaymentPage.inputCardNumber('4242424242424242');
  await stripePaymentPage.inputExpiry('0225');
  await stripePaymentPage.inputCvc('444');
  await stripePaymentPage.inputCardName('James Jimmy');
  await stripePaymentPage.selectCountry('United Kingdom');
  await stripePaymentPage.inputAddressLine('High Street');
  await stripePaymentPage.inputAddressTown('Kingston');
  await stripePaymentPage.inputAddressPostalCode('KT1 1HL');
}

test.describe('Confirm booking flow', () => {
  test.describe('PAY-001 - Confirm Booking Happy Path', () => {
    test('User should see payment confirmation message', async ({ page }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);

      const id = 'alreadyregisteredconsumerwithlinkaccount1';
      const membershipNumber = '888111356';
      const externalId = '888111356';
      const flightNumber = 'BA1417';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      await selectLoungeTimePage.openLoungeTimeDropdown();
      await selectLoungeTimePage.selectFirstLoungeTime();
      await selectLoungeTimePage.clickConfirmButton();

      await page.waitForTimeout(10000);
      await confirmBookingPage.clickGoToPayment();

      await page.waitForTimeout(6000);

      // fill Stripe iframe inputs
      const stripePaymentPage = new StripePaymentPage(page);
      const title = await stripePaymentPage.getTitle();
      await expect(title).toEqual('Payment information');

      await stripePaymentPage.setStripeIframe();
      await fillStripeIframe(stripePaymentPage, id);

      // Assert before pay: button is in 'complete' class
      const payButton = await stripePaymentPage.getPayButton();
      await expect(payButton).toHaveClass(
        'SubmitButton SubmitButton--complete'
      );

      await page.waitForTimeout(6000);
      await stripePaymentPage.clickPay();

      //Final payment page, assert confirmation message on the page
      const paymentConfirmationPage = new PaymentConfirmationPage(page);
      const paymentSuccessMessage =
        await paymentConfirmationPage.paymentConfirmationMessage();
      await expect(paymentSuccessMessage).toBeVisible();

      //Get cancellation link from email
      const linkToCancel = await getLinkFromEmail(getEmailAddress(id));

      await expect(linkToCancel).toContain('cancel-booking');

      // Navigate the cancellation page
      await page.goto(linkToCancel);

      // Email & Pin confirmation again
      await getAndEnterPin(page, getEmailAddress(id));

      const cancelBookingPage = new CancelBookingPage(page);
      await cancelBookingPage.clickCancelBooking();
      await cancelBookingPage.clickConfirmCancelBooking();

      //Final payment page, assert cancellation confirmation message on the page
      const cancelledBookingConfirmationPage =
        new CancelledBookingConfirmationPage(page);
      const cancelledBookingSuccessMessage =
        await cancelledBookingConfirmationPage.cancelledBookingConfirmationMessage();
      await expect(cancelledBookingSuccessMessage).toBeVisible();
    });
  });
});

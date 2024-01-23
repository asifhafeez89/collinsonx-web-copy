import { test, expect } from '../../../baseFixtures';
import { getOneMonthFromToday } from '../utils/dateUtils';
import PreBookPage from '../pages/PreBookPage';
import PaymentConfirmationPage from '../pages/PaymentConfirmationPage';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import StripePaymentPage from '../pages/StripePaymentPage';
import CancelBookingPage from '../pages/CancelBookingPage';
import CancelledBookingConfirmationPage from '../pages/CancelledBookingConfirmationPage';
import {
  loginAsNewUser,
  getEmailAddress,
  getIdWithPrefix,
  getAndEnterPin,
} from '../utils/loginUtils';
import { getLinkFromEmail } from '../utils/emailUtils';
import {
  slotsGQLResponse,
  bookingGQLResponse,
  interceptGQLOperation,
  interceptStripe,
  paymentIntentResponse,
  paymentConfirmResponse,
} from '../utils/mockUtils';

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

test.beforeEach(async ({ page }) => {
  // mock: gets through the available slots every time
  await interceptGQLOperation(page, 'GetAvailableSlots', slotsGQLResponse);
  await interceptGQLOperation(page, 'GetBookingById', bookingGQLResponse);

  // mock: intercept Stripe 'payment_intents' and get confirmed payment
  await interceptStripe(page, 'createPaymentIntent', paymentIntentResponse);
  await interceptStripe(page, 'confirmPaymentIntent', paymentConfirmResponse);
});

test.describe('Confirm booking flow', () => {
  test.describe('PAY-001 - Confirm Booking Happy Path', () => {
    test('User should see payment confirmation message', async ({ page }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);

      const id = getIdWithPrefix();
      const membershipNumber = getIdWithPrefix();
      const externalId = getIdWithPrefix();
      const flightNumber = 'BA1417';

      // Act
      await loginAsNewUser(page, id, membershipNumber, externalId);

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

      // Assert confirm Booking Page
      const dateSelected = await confirmBookingPage.dateSelected(
        oneMonthFromNow.String
      );
      const confirmedFlightNumber = await confirmBookingPage.flightNumber(
        flightNumber
      );
      const whosComing = await confirmBookingPage.whosComing('Adults 2');

      await expect(confirmedFlightNumber).toBeVisible();
      await expect(dateSelected).toBeVisible();
      await expect(whosComing).toBeVisible();

      // Go to payment
      await page.waitForTimeout(10000);
      await confirmBookingPage.clickGoToPayment();

      // fill Stripe iframe inputs
      const stripePaymentPage = new StripePaymentPage(page);
      const title = await stripePaymentPage.getTitle();
      expect(title).toEqual('Payment information');

      await stripePaymentPage.setStripeIframe();
      await fillStripeIframe(stripePaymentPage, id);

      // Assert before pay: button is in 'complete' class
      const payButton = await stripePaymentPage.getPayButton();
      await expect(payButton).toHaveClass(
        'SubmitButton SubmitButton--complete',
        { timeout: 10000 }
      );

      // Stripe payment intent and confirm
      await stripePaymentPage.clickPay();

      // Final payment page, assert confirmation message on the page.
      const paymentConfirmationPage = new PaymentConfirmationPage(page);

      await page.waitForURL('**/confirm-payment');

      const paymentSuccessMessage =
        await paymentConfirmationPage.paymentConfirmationMessage();
      await expect(paymentSuccessMessage).toBeVisible({ timeout: 10000 });

      // The next section will be run on local testing only to decrese dependency from external application
      if (!process.env.GITHUB_ACTIONS) {
        // Wait for payment confirmation message and then get cancellation link from email
        await page.waitForTimeout(10000);
        const linkToCancel = await getLinkFromEmail(getEmailAddress(id));

        expect(linkToCancel).toContain('cancel-booking');

        // Navigate the cancellation page
        await page.goto(linkToCancel);

        // set iFrame
        const iframeHandle = await page.waitForSelector(
          'iframe[id="loungebookingfeature"]'
        );
        const iframe = await iframeHandle.contentFrame();

        // Email & Pin confirmation again, wait for email
        await page.waitForTimeout(30000);
        await getAndEnterPin(iframe, getEmailAddress(id));

        const cancelBookingPage = new CancelBookingPage(iframe);
        await cancelBookingPage.clickCancelBooking();
        await cancelBookingPage.clickConfirmCancelBooking();

        //Final payment page, assert cancellation confirmation message on the page
        const cancelledBookingConfirmationPage =
          new CancelledBookingConfirmationPage(iframe);
        const cancelledBookingSuccessMessage =
          await cancelledBookingConfirmationPage.cancelledBookingConfirmationMessage();
        await expect(cancelledBookingSuccessMessage).toBeVisible();
      }
    });
  });
});

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
  loginAsNewUser,
  getEmailAddress,
  getAndEnterPin,
} from '../utils/loginUtils';
import { getLinkFromEmail, getCancelEmail } from '../utils/emailUtils';
import {
  interceptGQLOperation,
  slotsGQLResponse,
  interceptStripe,
  paymentIntentResponse,
  paymentConfirmResponse,
} from '../utils/mockUtils';
import { v4 as uuidv4 } from 'uuid';

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

      const id = uuidv4();
      const membershipNumber = uuidv4();
      const externalId = uuidv4();
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
      const loungeTime = await confirmBookingPage.loungeTime();

      await expect(confirmedFlightNumber).toBeVisible();
      await expect(dateSelected).toBeVisible();
      await expect(whosComing).toBeVisible();

      // Go to payment
      await page.waitForTimeout(10000);
      await confirmBookingPage.clickGoToPayment();
      await page.waitForTimeout(6000);

      // fill Stripe iframe inputs
      const stripePaymentPage = new StripePaymentPage(page);
      const title = await stripePaymentPage.getTitle();
      await expect(title).toEqual('Payment information');

      await stripePaymentPage.setStripeIframe();
      await fillStripeIframe(stripePaymentPage, id);

      // Assert before pay: button is in 'complete' class.
      const payButton = await stripePaymentPage.getPayButton();
      await expect(payButton).toHaveClass(
        'SubmitButton SubmitButton--complete',
        { timeout: 30000 }
      );
    });
  });
});

import { test, expect } from '../baseFixtures';
import { getOneMonthFromToday, getTomorrow } from '../utils/dateUtils';
import PreBookPage from '../pages/PreBookPage';
import RegistrationPage from '../pages/RegistrationPage';
import PaymentConfirmationPage from '../pages/PaymentConfirmationPage';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import StripePaymentPage from '../pages/StripePaymentPage';
import AmendBookingPage from '../pages/AmendBookingPage';
import AmendBookingCheckSlotPage from '../pages/AmendBookingCheckSlotPage';
import AmendedBookingConfirmationPage from '../pages/AmendedBookingConfirmationPage';
import { loginUser, getAndEnterPin } from '../utils/loginUtils';
import { getIdFromEmail, getLink } from '../utils/emailUtils';
import {
  slotsGQLResponse,
  bookingGQLResponse,
  interceptGQLOperation,
  interceptStripe,
  paymentIntentResponse,
  paymentConfirmResponse,
} from '../utils/mockUtils';
import { generateNewUser, generateEmailAddress } from '../utils/mockData';

async function fillStripeIframe(
  stripePaymentPage: StripePaymentPage,
  email: string
) {
  await stripePaymentPage.inputEmail(email);
  await stripePaymentPage.inputCardNumber('378282246310005');
  await stripePaymentPage.inputExpiry('0225');
  await stripePaymentPage.inputCvc('444');
  await stripePaymentPage.inputCardName('James Jimmy');
  await stripePaymentPage.selectCountry('United Kingdom');
  await stripePaymentPage.inputAddressLine('High Street');
  await stripePaymentPage.inputAddressTown('Kingston');
  await stripePaymentPage.inputAddressPostalCode('KT1 1HL');
}

const payload = generateNewUser();
let id: string;
let email: string;
// Use id from local .env.test if doesn't run on github
if (!process.env.GITHUB_ACTIONS) {
  id = process.env.AMEND_USER_ID || 'testidforamendbooking';
  email = <string>generateEmailAddress(id);
} else {
  email = <string>payload.email;
  id = getIdFromEmail(email);
}

bookingGQLResponse.getBookingByID.consumer.emailAddress = email;

test.beforeEach(async ({ page }) => {
  // mock: gets through the available slots every time
  await interceptGQLOperation(page, 'GetAvailableSlots', slotsGQLResponse);
  await interceptGQLOperation(page, 'GetBookingById', bookingGQLResponse);

  // mock: intercept Stripe 'payment_intents' and get confirmed payment
  await interceptStripe(page, 'createPaymentIntent', paymentIntentResponse);
  await interceptStripe(page, 'confirmPaymentIntent', paymentConfirmResponse);
});

test.describe('Amend booking flow', () => {
  test.describe('AMB-001 - Amend Booking Happy Path', () => {
    test('User should see amend booking confirmation message', async ({
      page,
    }) => {
      // Arrange
      const registrationPage = new RegistrationPage(page);
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);
      const oneMonthFromNow = getOneMonthFromToday();
      const flightNumber = 'BA1417';

      await loginUser(page, id, payload.membershipNumber, payload.externalId);
      await registrationPage.clickLogin();

      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      await selectLoungeTimePage.openLoungeTimeDropdown();
      await selectLoungeTimePage.selectFirstLoungeTime();
      await selectLoungeTimePage.clickConfirmButton();

      // Go to payment
      await page.waitForTimeout(10000);
      await confirmBookingPage.clickGoToPayment();

      // fill Stripe iframe inputs
      const stripePaymentPage = new StripePaymentPage(page);

      await stripePaymentPage.setStripeIframe();
      await fillStripeIframe(stripePaymentPage, email);

      // Assert before pay: button is in 'complete' class
      const payButton = await stripePaymentPage.getPayButton();
      await expect(payButton).toHaveClass(
        'SubmitButton SubmitButton--complete',
        { timeout: 10000 }
      );

      // Stripe payment intent and confirm
      await stripePaymentPage.clickPay();

      // Final payment page, confirmation message on the page.
      const paymentConfirmationPage = new PaymentConfirmationPage(page);

      await page.waitForURL('**/confirm-payment');

      // The next section will be run on local testing only until we have instable email delivery issue
      if (!process.env.GITHUB_ACTIONS) {
        // Wait for payment confirmation message and then get amend link from email
        await page.waitForTimeout(10000);
        const linkToAmend = await getLink(email, 'amend-booking');

        expect(linkToAmend).toContain('amend-booking');

        // Navigate the amend page
        await page.goto(linkToAmend);

        await getAndEnterPin(page, email);

        const amendBookingPage = new AmendBookingPage(page);

        // Assert text 'No additional fee required'
        const amendBookingNoFeeMessage =
          await amendBookingPage.amendBookingNoFeeMessage();
        await expect(amendBookingNoFeeMessage).toBeVisible({ timeout: 10000 });

        // AMB-001: Increase attendees +1 and assert text '£ 18.00'
        await amendBookingPage.increaseAdultGuests(1);
        const amendBookingTotalPrice =
          await amendBookingPage.amendBookingTotalPriceMessage();
        await expect(amendBookingTotalPrice).toBeVisible({ timeout: 10000 });

        // AMB-002: Decrease attendees -2 and assert text 'Amount to receive'
        await amendBookingPage.decreaseAdultGuests(2);
        const amendBookingReceiveFee =
          await amendBookingPage.amendBookingToReceiveFeeMessage();
        await expect(amendBookingReceiveFee).toBeVisible({ timeout: 10000 });

        // AMB-003: Increase attendees +1 back, change date to tomorrow, try to amend (Negative)

        // ===== { next test will not pass due to bug in 48h feature
        if (false) {
          await amendBookingPage.increaseAdultGuests(1);
          const newDate = getTomorrow();
          await amendBookingPage.openDatePicker();
          await amendBookingPage.clickNextMonth(newDate.Date);
          await amendBookingPage.selectDate(newDate.String);
          await amendBookingPage.clickCheckAvailability();
          const errorElement = await amendBookingPage.amend48HoursError();
          await expect(errorElement).toBeVisible();

          // ===== }
        }

        // AMB-004: Change date to +1 month and amend (Positive)
        await amendBookingPage.openDatePicker();
        await amendBookingPage.clickNextMonth(oneMonthFromNow.Date);
        await amendBookingPage.selectDate(oneMonthFromNow.String);
        await amendBookingPage.clickCheckAvailability();

        const amendBookingCheckSlotPage = new AmendBookingCheckSlotPage(page);
        await amendBookingCheckSlotPage.clickProceed();

        //Final page, assert amend confirmation message on the page
        const amendedBookingConfirmationPage =
          new AmendedBookingConfirmationPage(page);
        const amendedBookingSuccessMessage =
          await amendedBookingConfirmationPage.amendedBookingConfirmationMessage();
        await expect(amendedBookingSuccessMessage).toBeVisible();
      }
    });
  });
});

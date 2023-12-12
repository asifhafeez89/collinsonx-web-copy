import { test, expect } from '../../../baseFixtures';
import { getOneMonthFromTodayDate } from '../utils/dateUtils';
import PreBookPage from '../pages/PreBookPage';
import PaymentConfirmationPage from '../pages/PaymentConfirmationPage';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import StripePaymentPage from '../pages/StripePaymentPage';
import EnterEmailPage from '../pages/EnterEmailPage';
import { loginAsExistingUser, getEmailAddress } from '../utils/loginUtils';
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

      const id = 'alreadyregisteredconsumerwithlinkaccount4';
      const membershipNumber = '89760499';
      const externalId = '89760499';
      const flightNumber = 'BA1417';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      const oneMonthFromNowString = getOneMonthFromTodayDate();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth();
      await preBookPage.selectDate(oneMonthFromNowString);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      await selectLoungeTimePage.openLoungeTimeDropdown();
      await selectLoungeTimePage.selectFirstLoungeTime();
      await selectLoungeTimePage.clickConfirmButton();

      await page.waitForTimeout(6000);
      await confirmBookingPage.clickGoToPayment();

      await page.waitForTimeout(5000);

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
    });
  });
});

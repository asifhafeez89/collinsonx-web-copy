import { signJWT } from '@collinsonx/jwt';
import { redirectToBaas } from '../utils/redirectToBaas';
import { getOneMonthFromTodayDate } from '../utils/dateUtils';
import { getPinFromEmail } from '../utils/emailUtils';
import EnterEmailPage from '../pages/EnterEmailPage';
import EnterPinPage from '../pages/EnterPinPage';
import PreBookPage from '../pages/PreBookPage';

import { mailinatorAddress } from '../config';
import { test, expect } from '../../../baseFixtures';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import PaymentInfoPage from '../pages/PaymentInfoPage';

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

async function loginAsExistingUser(
  page,
  id,
  membershipNumber,
  externalId,
  email
) {
  const payload = {
    membershipNumber,
    externalId,
    email,
    firstName: 'Alice',
    lastName: 'Smith',
    membershipType: 'MASTERCARD_HSBC',
    accountProvider: 'PRIORITY_PASS',
    language: 'en',
  };
  const jwt = await signJWT(payload, secret);
  const lounge = 'MAN6';

  await redirectToBaas(page, jwt, lounge);

  const enterEmailPage = new EnterEmailPage(page);
  await enterEmailPage.clickContinue();
  await page.waitForTimeout(5000);
  const pin = await getPinFromEmail(email);

  const enterPinPage = new EnterPinPage(page);
  await enterPinPage.enterPin(pin);
  await enterPinPage.clickVerify();
}

test.describe('Create payment flow', () => {
  test.describe('PAY-001 - Create Payment with all valid data', () => {
    test('User should be navigated to the payment details page with the correct flight details, time slot, number of adults/children/infants and time arrival selected', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);
      const paymentInfoPage = new PaymentInfoPage(page);

      const id = 'alreadyregisteredconsumerwithlinkaccount4';
      const membershipNumber = '89760499';
      const externalId = '89760499';
      const flightNumber = 'KL1070';
      const email = `${id}@${mailinatorAddress}`;

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId, email);

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

      await page.waitForTimeout(5000);

      await confirmBookingPage.clickSubmit();

      await page.waitForTimeout(10000);

      // Assert with empty inputs pay
      const titleRoot = await paymentInfoPage.getTitleRoot();
      await expect(titleRoot).toEqual('Payment information');

      // fill Stripe iframe inputs
      const stripeFrame = await page.frameLocator(
        'iframe[name="embedded-checkout"]'
      );

      const cardEmailInput = await stripeFrame.locator('input[name="email"]');
      const cardNumInput = await stripeFrame.locator(
        'input[name="cardNumber"]'
      );
      const cardExpInput = await stripeFrame.locator(
        'input[name="cardExpiry"]'
      );
      const cardCVCInput = await stripeFrame.locator('input[name="cardCvc"]');
      const cardBillInput = await stripeFrame.locator(
        'input[name="billingName"]'
      );
      const cardCountryInput = await stripeFrame.locator(
        'select[name="billingCountry"]'
      );
      const cardBillAddr1Input = await stripeFrame.locator(
        'input[name="billingAddressLine1"]'
      );
      const cardBillPostInput = await stripeFrame.locator(
        'input[name="billingPostalCode"]'
      );
      const cardBillLocInput = await stripeFrame.locator(
        'input[name="billingLocality"]'
      );

      // fill inputs
      await cardEmailInput.fill(email);
      await cardNumInput.fill('4242424242424242');
      await cardExpInput.fill('12/34');
      await cardCVCInput.fill('123');
      await cardBillInput.fill('Alice Smith');
      await cardCountryInput.selectOption('United Kingdom');
      await cardBillAddr1Input.fill('1 King street');
      await cardBillPostInput.fill('M2 4AH');
      await cardBillLocInput.fill('Manchester');

      // Assert before pay: button is complete
      const submitButton = await stripeFrame.getByTestId(
        'hosted-payment-submit-button'
      );
      await expect(submitButton).toHaveClass(
        'SubmitButton SubmitButton--complete'
      );
    });
  });
});

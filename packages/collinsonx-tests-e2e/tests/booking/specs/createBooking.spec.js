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

const secret = process.env.NEXT_PUBLIC_JWT_SECRET || '';

async function loginAsExistingUser(page, id, membershipNumber, externalId) {
  const email = `${id}@${mailinatorAddress}`;
  const payload = {
    membershipNumber,
    externalId,
    email,
    firstName: 'Alice',
    lastName: 'Smith',
    membershipType: 'MASTERCARD_HSBC',
    accountProvider: 'PRIORITY_PASS',
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

test.describe('Create booking flow', () => {
  test.describe('BKG-001 - Create Booking with all valid data', () => {
    test('User should be navigated to the final details page with the correct flight details, time slot, number of adults/children/infants and time arrival selected', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);

      const id = 'alreadyregisteredconsumerwithlinkaccount4';
      const membershipNumber = '89760499';
      const externalId = '89760499';
      const flightNumber = 'KL1070';

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

      const dateSelected = await confirmBookingPage.dateSelected(
        oneMonthFromNowString
      );

      // Assert
      const confirmedFlightNumber = await confirmBookingPage.flightNumber(
        flightNumber
      );
      const whosComing = await confirmBookingPage.whosComing('Adults 2');
      const loungeTime = await confirmBookingPage.loungeTime();

      await expect(confirmedFlightNumber).not.toBeNull();
      await expect(dateSelected).not.toBeNull();
      await expect(whosComing).not.toBeNull();
      await expect(loungeTime).not.toBeNull();
    });
  });

  test.describe('BKG-002 - Create Booking with an invalid Flight Number', () => {
    test('An error message should be displayed indicating that the flight number is invalid.', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount5';
      const membershipNumber = '9487777';
      const externalId = '9487777';
      const flightNumber = 'ET666';
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      // Act
      const oneMonthFromNowString = getOneMonthFromTodayDate();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth();
      await preBookPage.selectDate(oneMonthFromNowString);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const invalidFlightError = await preBookPage.invalidFlightError();
      await expect(invalidFlightError).not.toBeNull();
    });
  });

  test.describe('BKG-003 - Create Booking without specifying a time slot', () => {
    test('An error message should appear under the box saying You have to specify time.', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount6';
      const membershipNumber = '15008';
      const externalId = '15008';
      const flightNumber = 'KL1070';
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      // Arrange
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const flightDateError = await preBookPage.flightDateError();
      await expect(flightDateError).not.toBeNull();
    });
  });

  test.describe('BKG-004 - Create Booking with maximum capacity of 5 is reached for Adults, Children.', () => {
    test('User should be navigated to the final details page with the correct flight details, time slot, number of adults/children/infants and time arrival selected', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const selectLoungeTimePage = new SelectLoungeTimePage(page);
      const confirmBookingPage = new ConfirmBookingPage(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount7';
      const membershipNumber = '83425';
      const externalId = '83425';
      const flightNumber = 'KL1070';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      const oneMonthFromNowString = getOneMonthFromTodayDate();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth();
      await preBookPage.selectDate(oneMonthFromNowString);
      await preBookPage.inputFlightNumber(flightNumber);
      for (let i = 0; i < 4; i++) {
        await preBookPage.increaseAdultGuests();
      }
      await preBookPage.clickSubmit();
      await selectLoungeTimePage.openLoungeTimeDropdown();
      await selectLoungeTimePage.selectFirstLoungeTime();
      await selectLoungeTimePage.clickConfirmButton();

      // Assert
      const dateSelected = await confirmBookingPage.dateSelected(
        oneMonthFromNowString
      );
      const confirmedFlightNumber = await confirmBookingPage.flightNumber(
        flightNumber
      );
      const whosComing = await confirmBookingPage.whosComing('Adults 5');
      const loungeTime = await confirmBookingPage.loungeTime();

      await expect(confirmedFlightNumber).not.toBeNull();
      await expect(dateSelected).not.toBeNull();
      await expect(whosComing).not.toBeNull();
      await expect(loungeTime).not.toBeNull();
    });
  });

  test.describe('BKG-007 - Create Booking with lounge for flight is in a different airport', () => {
    test('User should see airport mismatch error popup', async ({ page }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount8';
      const membershipNumber = '7432100';
      const externalId = '7432100';
      const flightNumber = 'BA169';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);
      const oneMonthFromNowString = getOneMonthFromTodayDate();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth();
      await preBookPage.selectDate(oneMonthFromNowString);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();
      await page.waitForTimeout(500);

      // Assert
      const airportMismatchWarning = preBookPage.airportMismatchWarning();
      await expect(airportMismatchWarning).not.toBeNull;
    });
  });

  test.describe('BKG-008 - Create Booking with incorrect format for the Flight Number', () => {
    test('User should see an error message indicating that the flight number is invalid.', async ({
      page,
    }) => {
      // Arrange
      const preBookPage = new PreBookPage(page);
      const id = 'alreadyregisteredconsumerwithlinkaccount9';
      const membershipNumber = '954732118';
      const externalId = '954732118';
      const flightNumber = 'INVALID';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);
      const oneMonthFromNowString = getOneMonthFromTodayDate();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth();
      await preBookPage.selectDate(oneMonthFromNowString);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const invalidFlightError = await preBookPage.invalidFlightError();
      expect(invalidFlightError).not.toBeNull();
    });
  });
});

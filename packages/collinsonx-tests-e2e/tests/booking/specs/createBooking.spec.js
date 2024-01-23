import { getOneMonthFromToday } from '../utils/dateUtils';
import PreBookPage from '../pages/PreBookPage';
import { test, expect } from '../../../baseFixtures';
import SelectLoungeTimePage from '../pages/SelectLoungeTimePage';
import ConfirmBookingPage from '../pages/ConfirmBookingPage';
import { loginAsExistingUser, getAndEnterPin } from '../utils/loginUtils';
import { interceptGQLOperation, slotsGQLResponse } from '../utils/mockUtils';

test.beforeEach(async ({ page }) => {
  // mock: gets through the available slots every time
  await interceptGQLOperation(page, 'GetAvailableSlots', slotsGQLResponse);
});

test.describe('Create booking flow', () => {
  test.skip('BKG-001 - Create Booking with all valid data', () => {
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
      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const invalidFlightError = await preBookPage.invalidFlightError();
      await expect(invalidFlightError).toBeVisible();
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
      const flightNumber = 'BA1417';
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      // Arrange
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const flightDateError = await preBookPage.flightDateError();
      await expect(flightDateError).toBeVisible();
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
      const flightNumber = 'BA1417';

      // Act
      await loginAsExistingUser(page, id, membershipNumber, externalId);

      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
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
        oneMonthFromNow.String
      );
      const confirmedFlightNumber = await confirmBookingPage.flightNumber(
        flightNumber
      );
      const whosComing = await confirmBookingPage.whosComing('Adults 5');
      const loungeTime = await confirmBookingPage.loungeTime();

      await expect(confirmedFlightNumber).toBeVisible();
      await expect(dateSelected).toBeVisible();
      await expect(whosComing).toBeVisible();
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
      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();
      await page.waitForTimeout(500);

      // Assert
      const airportMismatchWarning = await preBookPage.airportMismatchWarning();
      await expect(airportMismatchWarning).toBeVisible();
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
      const oneMonthFromNow = getOneMonthFromToday();
      await preBookPage.openDatePicker();
      await preBookPage.clickNextMonth(oneMonthFromNow.Date);
      await preBookPage.selectDate(oneMonthFromNow.String);
      await preBookPage.inputFlightNumber(flightNumber);
      await preBookPage.increaseAdultGuests();
      await preBookPage.clickSubmit();

      // Assert
      const invalidFlightError = await preBookPage.invalidFlightError();
      expect(invalidFlightError).toBeVisible();
    });
  });
});

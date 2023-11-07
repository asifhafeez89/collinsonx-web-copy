import { prettyPrintAxeReport } from 'axe-result-pretty-print';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import LoginPage from '../pages/LoginPage';
import PendingRequestsPage from '../pages/PendingRequestsPage';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';
import DeclinedBookingsPage from '../pages/DeclinedBookingsPage';
import WalkUpQRCodePage from '../pages/WalkUpQRCodePage';
import TestSetup from '../utils/TestSetup.js';
import BookingApi from '../utils/BookingApi';

const createAxeBuilder = (page) =>
  new AxeBuilder({ page })
    .exclude('iframe')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

test.describe('Login page', () => {
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goToURL();

    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });

    expect(results.violations).toEqual([]);
  });
});

test.describe('Pages that require initial login', () => {
  let partnerDetails;
  let lounge;
  let loginPage;

  test.beforeEach(async ({ page, request }) => {
    lounge = new TestSetup(request);
    partnerDetails = await lounge.setup();
    loginPage = new LoginPage(page);
    await loginPage.login(partnerDetails.email, partnerDetails.password);
  });

  test.afterEach(async () => {
    await lounge.teardown();
  });

  test.describe('Bookings overview page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      // add a pending request to test the font used for the displayed count
      const bookingApi = new BookingApi(page);
      await bookingApi.addPendingRequest(lounge);

      await page.goto('/', { waitUntil: 'networkidle' });

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Pending bookings page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      // add booking row element
      const bookingApi = new BookingApi(page);
      await bookingApi.addPendingRequest(lounge);

      const pendingRequestsPage = new PendingRequestsPage(page);

      await pendingRequestsPage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('All confirmed bookings page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      // add booking row element
      const bookingApi = new BookingApi(page);
      await bookingApi.addConfirmedBooking(lounge);

      const allConfirmedBookingsPage = new AllConfirmedBookingsPage(page);

      await allConfirmedBookingsPage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Declined bookings page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      // add booking row element
      const bookingApi = new BookingApi(page);
      await bookingApi.addDeclinedBooking(lounge);

      const declinedBookingsPage = new DeclinedBookingsPage(page);

      await declinedBookingsPage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Walk-up QR code page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      const walkUpQRCodePage = new WalkUpQRCodePage(page);

      await walkUpQRCodePage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });
});

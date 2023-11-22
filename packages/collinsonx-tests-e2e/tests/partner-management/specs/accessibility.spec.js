import { prettyPrintAxeReport } from 'axe-result-pretty-print';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

import LoginPage from '../pages/LoginPage';
import PendingRequestsPage from '../pages/PendingRequestsPage';
import AllConfirmedBookingsPage from '../pages/AllConfirmedBookingsPage';
import DeclinedBookingsPage from '../pages/DeclinedBookingsPage';
import WalkUpQRCodePage from '../pages/WalkUpQRCodePage';
import { loungeMap } from '../utils/config';

const createAxeBuilder = (page) =>
  new AxeBuilder({ page })
    .exclude('iframe')
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']);

test.describe('Login page', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    await loginPage.goToURL();

    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

test.describe('Bookings overview page', () => {
  const lounge = loungeMap.get('lounge1');
  test.use({
    storageState: `playwright/.auth/${lounge.toLowerCase()}User.json`,
  });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    await page.goto('/', { waitUntil: 'networkidle' });
    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

test.describe('Pending bookings page', () => {
  const lounge = loungeMap.get('lounge2');
  test.use({
    storageState: `playwright/.auth/${lounge.toLowerCase()}User.json`,
  });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    const pendingRequestsPage = new PendingRequestsPage(page);

    await pendingRequestsPage.goToURL();
    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

test.describe('All confirmed bookings page', () => {
  const lounge = loungeMap.get('lounge3');
  test.use({
    storageState: `playwright/.auth/${lounge.toLowerCase()}User.json`,
  });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    const allConfirmedBookingsPage = new AllConfirmedBookingsPage(page);

    await allConfirmedBookingsPage.goToURL();
    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

test.describe('Declined bookings page', () => {
  const lounge = loungeMap.get('lounge4');
  test.use({
    storageState: `playwright/.auth/${lounge.toLowerCase()}User.json`,
  });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    const declinedBookingsPage = new DeclinedBookingsPage(page);

    await declinedBookingsPage.goToURL();
    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

test.describe('Walk-up QR code page', () => {
  const lounge = loungeMap.get('lounge5');
  test.use({
    storageState: `playwright/.auth/${lounge.toLowerCase()}User.json`,
  });
  test('should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    // Arrange
    const walkUpQRCodePage = new WalkUpQRCodePage(page);

    await walkUpQRCodePage.goToURL();
    // Act
    const axeBuilder = createAxeBuilder(page);
    const results = await axeBuilder.analyze();

    prettyPrintAxeReport({
      violations: results.violations,
      passes: results.passes,
    });
    // Assert
    expect(results.violations).toEqual([]);
  });
});

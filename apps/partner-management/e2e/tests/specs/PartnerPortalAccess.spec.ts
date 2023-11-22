import { test, expect } from '../baseFixtures';
import LoginPage from '../pages/LoginPage';
import TestSetup from '../utils/TestSetup';
import PartnerPortalDashboardPage from '../pages/PartnerPortalDashboardPage';
import BookingOverviewPage from '../pages/BookingOverviewPage';

test.describe('partner portal dashboard', () => {
  test('super user has access to the catalogue widget', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
    const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

    await loginPage.login(username!, password!);

    const title = dashboardPage.title();
    const catalogueWidget = dashboardPage.catalogueWidget();

    await expect(title).toBeVisible();
    await expect(catalogueWidget).toBeVisible();
  });

  test('partner does not have access to the catalogue widget', async ({
    page,
    request,
  }) => {
    const lounge = new TestSetup(request);
    const partnerDetails = await lounge.setup();
    const loginPage = new LoginPage(page);
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const bookingOverviewPage = new BookingOverviewPage(page);

    await loginPage.login(partnerDetails.username, partnerDetails.password);

    const title = bookingOverviewPage.title();
    const catalogueWidget = dashboardPage.catalogueWidget();

    await expect(title).toBeVisible();
    await expect(catalogueWidget).toHaveCount(0);
  });
});

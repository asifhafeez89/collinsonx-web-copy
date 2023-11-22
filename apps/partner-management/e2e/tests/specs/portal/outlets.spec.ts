import { test, expect } from '../../baseFixtures';
import PartnerPortalDashboardPage from '../../pages/PartnerPortalDashboardPage';
import LoginPage from '../../pages/LoginPage';
import OutletsPage from '../../pages/OutletsPage';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
  const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

  await loginPage.login(username!, password!);
});

test.describe('outlets page', () => {
  test('super user can view a list of unfiltered outlets', async ({ page }) => {
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const outletsPage = new OutletsPage(page);

    await dashboardPage.clickViewAllOutletsButton();

    const title = outletsPage.title();
    const outletCard = outletsPage.outletCard();

    await expect(title).toBeVisible();
    // 10 outlets expected to show
    await expect(outletCard).toHaveCount(10);
  });
});

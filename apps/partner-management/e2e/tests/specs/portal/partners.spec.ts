import { test, expect } from '../../baseFixtures';
import PartnerPortalDashboardPage from '../../pages/PartnerPortalDashboardPage';
import LoginPage from '../../pages/LoginPage';
import PartnersPage from 'e2e/tests/pages/PartnersPage';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';
import { CARDS_LIMIT } from 'config';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
  const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

  await loginPage.login(username!, password!);
});

test.describe('partners page', () => {
  test('super user can view a list of unfiltered partners', async ({
    page,
  }) => {
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const partnersPage = new PartnersPage(page);

    await dashboardPage.clickViewAllPartnersButton();

    const title = partnersPage.title();
    const partnerCard = partnersPage.partnerCard();

    await expect(title).toBeVisible();
    await expect(partnerCard).toHaveCount(CARDS_LIMIT);
  });

  test('partners display the correct outlet count', async ({ page }) => {
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const partnersPage = new PartnersPage(page);
    const catalogueApi = new CatalogueApi();

    await dashboardPage.clickViewAllPartnersButton();

    const partnerBrands = await catalogueApi.getPartnerBrands();

    // compare UI and API outlet counts
    for (let i = 0; i < partnerBrands.length; i++) {
      const outletCountUI = +(
        await page.getByTestId(`outlet-count-${[i]}`).innerText()
      ).split(' ')[0];
      const outletCountAPI = partnerBrands[i].outlets.length;

      expect(outletCountUI).toBe(outletCountAPI);
    }
  });
});

import { test, expect } from '../../baseFixtures';
import PartnerPortalDashboardPage from '../../pages/PartnerPortalDashboardPage';
import LoginPage from '../../pages/LoginPage';
import PartnersPage from 'e2e/tests/pages/PartnersPage';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';
import { CARDS_LIMIT } from 'config';
import Helper from 'e2e/tests/helpers/Helper';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
  const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

  await loginPage.login(username!, password!);
});

test.describe('partners page', () => {
  test('super user can view an unfiltered table that lists partners', async ({
    page,
  }) => {
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const partnersPage = new PartnersPage(page);

    await dashboardPage.clickViewAllPartnersButton();

    const title = partnersPage.title();
    const partnerRow = await partnersPage.partnerTableRow();
    const tableHeaderRow = await partnersPage.partnerTableHeaderRow();
    const expectedHeaderCount = 3;
    const partnerColumn = await partnersPage.partnerTableHeader('Partner');
    const numberOfOutletsColumn = await partnersPage.partnerTableHeader(
      'Number of outlets'
    );
    const actionColumn = await partnersPage.partnerTableHeader('Action');
    const navSection = await Helper.navSection(page);

    await expect(navSection).toHaveText('Catalogue');
    await expect(title).toBeVisible();
    await expect(tableHeaderRow).toHaveCount(expectedHeaderCount);
    await expect(partnerColumn).toBeVisible();
    await expect(numberOfOutletsColumn).toBeVisible();
    await expect(actionColumn).toBeVisible();
    await expect(partnerRow).toHaveCount(CARDS_LIMIT);
  });

  test('partners display the correct outlet count', async ({ page }) => {
    const dashboardPage = new PartnerPortalDashboardPage(page);
    const partnersPage = new PartnersPage(page);
    const catalogueApi = new CatalogueApi();

    await dashboardPage.clickViewAllPartnersButton();

    const partnerBrands = await catalogueApi.getPartnerBrands(CARDS_LIMIT);

    // compare UI and API outlet counts
    for (let i = 0; i < partnerBrands.length; i++) {
      const outletCountUI = +(
        await page.getByTestId(`partner-row-outlets-${[i]}`).innerText()
      ).split(' ')[0];
      const outletCountAPI = partnerBrands[i].outlets.length;

      expect(outletCountUI).toBe(outletCountAPI);
    }
  });
});

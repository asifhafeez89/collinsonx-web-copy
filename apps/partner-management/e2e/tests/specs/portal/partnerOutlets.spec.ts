import { test, expect } from '../../baseFixtures';
import LoginPage from '../../pages/LoginPage';
import PartnersPage from 'e2e/tests/pages/PartnersPage';
import OutletsPage from 'e2e/tests/pages/OutletsPage';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
  const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

  await loginPage.login(username!, password!);
});

test.describe('partner-specific outlets page', () => {
  test('super user can view an unfiltered list of partner-specific outlets', async ({
    page,
  }) => {
    const outletsPage = new OutletsPage(page);
    const partnersPage = new PartnersPage(page);
    const catalogueApi = new CatalogueApi();

    await partnersPage.goToURL();

    await partnersPage.clickFirstPartnerCardViewOutletsButton();

    await page.waitForURL('**/outlets?partner=*');

    const currentUrl = page.url();
    const partnerId = currentUrl.split('outlets?partner=')[1];
    const partnerBrand = await catalogueApi.getPartnerBrandByID(partnerId);
    const title = outletsPage.title();
    const outletCard = outletsPage.outletCard();
    const outletCountAPI = partnerBrand.outlets.length;

    await expect(title).toBeVisible();
    await expect(outletCard).toHaveCount(outletCountAPI);
  });
});

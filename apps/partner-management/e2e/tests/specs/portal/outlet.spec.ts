import { test, expect } from '../../baseFixtures';
import LoginPage from '../../pages/LoginPage';
import OutletsPage from '../../pages/OutletsPage';
import OutletPage from 'e2e/tests/pages/OutletPage';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
  const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

  await loginPage.login(username!, password!);
});

test.describe('outlet page', () => {
  test('super user can navigate to an outlet page from the outlets page', async ({
    page,
  }) => {
    const outletsPage = new OutletsPage(page);
    const outletPage = new OutletPage(page);

    await outletsPage.goToURL();

    const outletsPageFirstCardTitle = await outletsPage.firstOuletCardTitle();
    const outletsPageFirstCardSubtitle =
      await outletsPage.firstOuletCardSubtitle();

    await outletsPage.clickFirstOutletCardViewDetailsButton();

    const outletPageTitle = await outletPage.title();
    const outletPageSubtitle = await outletPage.subtitle();

    expect(outletsPageFirstCardTitle).toEqual(outletPageTitle);
    expect(outletsPageFirstCardSubtitle).toEqual(outletPageSubtitle);
  });

  test('super user can navigate to an outlet page from the partner-specific outlets page', async ({
    page,
  }) => {
    const outletsPage = new OutletsPage(page);
    const outletPage = new OutletPage(page);
    const catalogueApi = new CatalogueApi();

    const partnerBrands = await catalogueApi.getPartnerBrands(1);
    const partnerId = partnerBrands[0].id;

    await outletsPage.goToURLFilterByPartnerBrandId(partnerId);

    const outletsPageFirstCardTitle = await outletsPage.firstOuletCardTitle();
    const outletsPageFirstCardSubtitle =
      await outletsPage.firstOuletCardSubtitle();

    await outletsPage.clickFirstOutletCardViewDetailsButton();

    const outletPageTitle = await outletPage.title();
    const outletPageSubtitle = await outletPage.subtitle();

    expect(outletsPageFirstCardTitle).toEqual(outletPageTitle);
    expect(outletsPageFirstCardSubtitle).toEqual(outletPageSubtitle);
  });
});

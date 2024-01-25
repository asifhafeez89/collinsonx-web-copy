import { test, expect } from '../../baseFixtures';
import LoginPage from '../../pages/LoginPage';
import OutletsPage from '../../pages/OutletsPage';
import OutletPage from 'e2e/tests/pages/OutletPage';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';
import { toTitleCase } from 'utils/textUtils';
import { Product, ProductCategory } from '@collinsonx/utils';

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

  test('outlet summary section displays the correct information', async ({
    page,
  }) => {
    const outletPage = new OutletPage(page);
    const catalogueApi = new CatalogueApi();

    const outlets = await catalogueApi.getOutlets(1, 1);
    const outletId = outlets[0].id;
    const outlet = await catalogueApi.getOutletByID(outletId);
    await outletPage.goToURL(outletId);

    const summarySection = await outletPage.summarySection();
    const summarySectionInfo = await outletPage.summarySectionInfo();

    // UI should only display the expected categories
    let categoriesValue = outlet.productCategories.filter((category: any) =>
      Object.values(ProductCategory).includes(category)
    );

    // Default values for when the data is null
    if (categoriesValue.length == 0) categoriesValue = 'N/A';
    let statusValue = 'INACTIVE';
    let primaryProductsValue = 'N/A';
    let emailValue = 'N/A';

    // Format data received from the API response to display as it would in the UI
    if (outlet.status == 'LIVE') statusValue = 'ACTIVE';
    if (outlet.reservationEmail != null) emailValue = outlet.reservationEmail;

    if (outlet.products.length > 0) {
      primaryProductsValue = '';
      const filteredProducts = outlet.products.filter(
        (product: Product) => !product
      );
      if (filteredProducts.length === 0) {
        for (let i = 0; i < outlet.products.length; i++) {
          let newLine = i + 1 < outlet.products.length ? '\n\n' : '';
          primaryProductsValue += `${toTitleCase(
            outlet.products[i].category
          )} / ${outlet.products[i].name}${newLine}`;
        }
      }
    }

    expect(summarySection).toBeVisible();
    expect
      .soft(summarySectionInfo['Location type'])
      .toBe(toTitleCase(outlet.category));
    expect.soft(summarySectionInfo['Legacy code']).toBe(outlet.legacyCode);
    expect.soft(summarySectionInfo['Outlet code']).toBe(outlet.code);
    // Currently we expect an outlet to be of one category type e.g. "EAT"
    expect.soft(summarySectionInfo['Categories']).toBe(categoriesValue[0]);
    expect.soft(summarySectionInfo['Status']).toBe(statusValue);
    expect
      .soft(summarySectionInfo['Primary products'])
      .toBe(primaryProductsValue);
    expect
      .soft(summarySectionInfo['Disabled access'])
      .toBe(outlet.hasDisabledAccess ? 'Yes' : 'No');
    expect.soft(summarySectionInfo['Email']).toBe(emailValue);
  });
});

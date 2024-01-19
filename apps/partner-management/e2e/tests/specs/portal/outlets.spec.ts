import { test, expect } from '../../baseFixtures';
import PartnerPortalDashboardPage from '../../pages/PartnerPortalDashboardPage';
import LoginPage from '../../pages/LoginPage';
import OutletsPage from '../../pages/OutletsPage';
import { CARDS_LIMIT } from 'config';
import CatalogueApi from 'e2e/tests/utils/CatalogueApi';

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
    const catalogueApi = new CatalogueApi();

    await dashboardPage.clickViewAllOutletsButton();

    const title = outletsPage.title();
    const pagination = outletsPage.pagination();
    const outlets = await catalogueApi.getOutlets(1, CARDS_LIMIT);
    const outletCards = await outletsPage.outletCards();

    await expect(title).toBeVisible();
    await outletsPage.assertCorrectNumberOfOutletsAreDisplayed(CARDS_LIMIT);
    expect(outletCards).toHaveLength(CARDS_LIMIT);
    await expect(pagination).toBeVisible();
    await outletsPage.assertCorrectOutletsAreDisplayed(outlets);
  });

  test.describe('pagination validation', () => {
    test('correct page navigation buttons are displayed on the first page', async ({
      page,
    }) => {
      const outletsPage = new OutletsPage(page);
      const catalogueApi = new CatalogueApi();

      await outletsPage.goToURL();

      const totalOutletCount = await catalogueApi.getOutletsCount();
      const expectedPageCount = Math.ceil(totalOutletCount / CARDS_LIMIT);
      const maxPageButton = outletsPage.paginationButton(expectedPageCount);
      const previousPageButton = outletsPage.previousPageButton();
      const nextPageButton = outletsPage.nextPageButton();
      const outlets = await catalogueApi.getOutlets(1, CARDS_LIMIT);

      await outletsPage.assertCorrectOutletsAreDisplayed(outlets);
      await expect(maxPageButton).toBeVisible();
      await expect(previousPageButton).toBeDisabled();
      await expect(nextPageButton).toBeEnabled();
    });

    test('navigate to and from the next page', async ({ page }) => {
      const outletsPage = new OutletsPage(page);
      const catalogueApi = new CatalogueApi();

      const totalOutletCount = await catalogueApi.getOutletsCount();

      // page navigation wont be possible if only 1 page exists
      test.skip(
        totalOutletCount <= CARDS_LIMIT,
        'The test requires the total number of outlets in the database to be greater than the page limit.'
      );

      await outletsPage.goToURL();

      await expect(outletsPage.pageNavigator()).toBeVisible();

      await outletsPage.nextPageButton().click();

      const currentPageButton = outletsPage.currentPaginationButton();
      const currentPageButtonInnerText = await currentPageButton.evaluate(
        (button) => button.innerHTML
      );
      const outletsPage2 = await catalogueApi.getOutlets(2, CARDS_LIMIT);

      expect(currentPageButtonInnerText).toEqual('2');
      await expect(page).toHaveURL('/outlets?page=2');
      await outletsPage.assertCorrectOutletsAreDisplayed(outletsPage2);

      await outletsPage.previousPageButton().click();

      const currentPageButton2 = outletsPage.currentPaginationButton();
      const currentPageButton2InnerText = await currentPageButton2.evaluate(
        (button) => button.innerHTML
      );
      const outletsPage1 = await catalogueApi.getOutlets(1, CARDS_LIMIT);

      expect(currentPageButton2InnerText).toEqual('1');
      await expect(page).toHaveURL('/outlets?page=1');
      await outletsPage.assertCorrectOutletsAreDisplayed(outletsPage1);
    });

    test('pagination button navigates to correct page', async ({ page }) => {
      const outletsPage = new OutletsPage(page);
      const catalogueApi = new CatalogueApi();

      const totalOutletCount = await catalogueApi.getOutletsCount();

      test.skip(
        totalOutletCount <= CARDS_LIMIT,
        'The test requires the total number of outlets in the database to be greater than the page limit.'
      );

      await outletsPage.goToURL();

      await expect(outletsPage.pageNavigator()).toBeVisible();

      await outletsPage.paginationButton(2).click();

      const outlets = await catalogueApi.getOutlets(2, CARDS_LIMIT);
      const currentPageButton = outletsPage.currentPaginationButton();
      const currentPageButtonInnerText = await currentPageButton.evaluate(
        (button) => button.innerHTML
      );

      expect(currentPageButtonInnerText).toEqual('2');
      await outletsPage.assertCorrectOutletsAreDisplayed(outlets);
    });
  });
});

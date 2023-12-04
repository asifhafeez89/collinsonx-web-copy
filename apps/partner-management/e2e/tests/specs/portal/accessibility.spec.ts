import { prettyPrintAxeReport } from 'axe-result-pretty-print';
import { test, expect } from '../../baseFixtures';
import AxeBuilder from '@axe-core/playwright';
import LoginPage from 'e2e/tests/pages/LoginPage';
import PartnerPortalDashboardPage from 'e2e/tests/pages/PartnerPortalDashboardPage';
import PartnersPage from 'e2e/tests/pages/PartnersPage';
import OutletsPage from 'e2e/tests/pages/OutletsPage';

const createAxeBuilder = (page: any) =>
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
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
    const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

    await loginPage.login(username!, password!);
  });

  test.describe('Partner portal dashboard page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      const partnerPortalDashboardPage = new PartnerPortalDashboardPage(page);

      await partnerPortalDashboardPage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Partners page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      const partnersPage = new PartnersPage(page);

      await partnersPage.goToURL();

      const axeBuilder = createAxeBuilder(page);
      const results = await axeBuilder.analyze();

      prettyPrintAxeReport({
        violations: results.violations,
        passes: results.passes,
      });

      expect(results.violations).toEqual([]);
    });
  });

  test.describe('Outlets page', () => {
    test('should not have any automatically detectable accessibility issues', async ({
      page,
    }) => {
      const outletsPage = new OutletsPage(page);

      await outletsPage.goToURL();

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

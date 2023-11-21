import { Page } from '@playwright/test';

export default class PartnerPortalDashboardPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Partner Portal',
    });
  }

  clickViewAllOutletsButton() {
    return this.page.getByTestId('viewAllOutlets').click();
  }

  clickViewAllPartnersButton() {
    return this.page.getByTestId('viewAllPartners').click();
  }
}

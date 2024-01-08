import { Page } from '@playwright/test';

export default class PartnersPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Partners',
    });
  }

  goToURL() {
    return this.page.goto('/partners', { waitUntil: 'networkidle' });
  }

  clickFirstPartnerRowViewOutletsButton() {
    return this.page
      .getByTestId('partner-row-action-0')
      .getByRole('button')
      .click();
  }

  partnerRow() {
    return this.page.getByTestId('partner-row');
  }
}

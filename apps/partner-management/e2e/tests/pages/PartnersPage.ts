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

  clickFirstPartnerCardViewOutletsButton() {
    return this.page.getByTestId('view-outlets-button-0').click();
  }

  partnerCard() {
    return this.page.getByTestId('partner-card');
  }
}

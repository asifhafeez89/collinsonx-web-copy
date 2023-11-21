import { Page } from '@playwright/test';

export default class OutletPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Outlets',
    });
  }

  goToURL() {
    return this.page.goto('/outlets', { waitUntil: 'networkidle' });
  }

  clickFirstOutletCardViewDetailsButton() {
    return this.page.getByTestId('view-details-button-0').click();
  }
}

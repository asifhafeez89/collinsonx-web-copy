import { Page } from '@playwright/test';

export default class OutletPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByTestId('outlet-title').innerText();
  }

  subtitle() {
    return this.page.getByTestId('outlet-subtitle').innerText();
  }

  goToURL(outletId: string) {
    return this.page.goto(`/outlets/${outletId}`, { waitUntil: 'networkidle' });
  }

  clickFirstOutletCardViewDetailsButton() {
    return this.page.getByTestId('view-details-button-0').click();
  }

  outletCard() {
    return this.page.getByTestId('outlet-card');
  }
}

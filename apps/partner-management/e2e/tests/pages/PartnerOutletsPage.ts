import { Page } from '@playwright/test';

export default class PartnerOutletsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Outlets',
    });
  }

  goToURL(partnerBrandId: string) {
    return this.page.goto(`/outlets/${partnerBrandId}`, {
      waitUntil: 'networkidle',
    });
  }

  clickFirstOutletCardViewDetailsButton() {
    return this.page.getByTestId('view-details-button-0').click();
  }

  outletCard() {
    return this.page.getByTestId('outlet-card');
  }
}

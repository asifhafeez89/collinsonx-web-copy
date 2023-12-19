import { Page } from '@playwright/test';

export default class OutletsPage {
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

  goToURLFilterByPartnerBrandId(partnerBrandId: string) {
    return this.page.goto(`/outlets?partner=${partnerBrandId}`, {
      waitUntil: 'networkidle',
    });
  }

  firstOuletCardTitle() {
    return this.page.getByTestId('outlet-card-title-0').innerText();
  }

  firstOuletCardSubtitle() {
    return this.page.getByTestId('outlet-card-subtitle-0').innerText();
  }

  clickFirstOutletCardViewDetailsButton() {
    return this.page.getByTestId('view-details-button-0').click();
  }

  outletCard() {
    return this.page.getByTestId('outlet-card');
  }
}
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

  async summarySection() {
    await this.page.waitForSelector('#outlet-container');
    return this.page.getByTestId('outlet-summary-section');
  }
  /**
   *
   * @returns The outlet's summary section as an object
   */
  async summarySectionInfo() {
    await this.page.waitForSelector('#outlet-container');
    const summaryRows = await this.page.getByTestId('outlet-summary-row').all();

    const summarySection: { [key: string]: any } = {};

    for (const row of summaryRows) {
      let property = await row.locator('dt').innerText();
      let value = await row.locator('dd').innerText();

      summarySection[property] = value;
    }

    return summarySection;
  }
}

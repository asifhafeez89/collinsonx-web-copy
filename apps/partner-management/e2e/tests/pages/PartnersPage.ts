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

  async clickFirstPartnerRowViewOutletsButton() {
    await this.page.getByTestId('partners-table');
    return this.page
      .getByTestId('partner-row-action-0')
      .getByRole('button')
      .click();
  }

  async partnerTableHeaderRow() {
    const partnerTable = await this.partnerTable();
    return partnerTable.locator('thead > tr > th');
  }

  async partnerTableHeader(headerName: string) {
    const partnerTable = await this.partnerTable();
    return partnerTable.getByRole('cell', { name: headerName });
  }

  async partnerTableRow() {
    await this.page.getByTestId('partners-table');
    return this.page.getByTestId('partner-row');
  }

  async partnerTable() {
    await this.page.getByTestId('partners-table');
    // should only be one table displayed on the page
    return this.page.getByRole('table');
  }
}

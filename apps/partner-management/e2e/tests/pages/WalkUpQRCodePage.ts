import { Page } from '@playwright/test';

export default class WalkUpQRCodePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  goToURL() {
    return this.page.goto('/qr-code', { waitUntil: 'networkidle' });
  }
}

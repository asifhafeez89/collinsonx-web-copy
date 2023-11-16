import { Page } from '@playwright/test';

export default class Helper {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async wait(time: number) {
    await this.page.waitForTimeout(time);
  }

  async type(words: string) {
    await this.page.keyboard.type(words);
  }

  async acceptAlert() {
    await this.page.on('dialog', (dialog) => dialog.accept());
  }
}

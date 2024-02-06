import { Page, Frame } from '@playwright/test';

export default class BasePage {
  page: Page | Frame;

  constructor(page: Page | Frame) {
    this.page = page;
  }
}

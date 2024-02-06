import BasePage from './BasePage';

export default class LoungePage extends BasePage {
  async clickPrebook() {
    const prebookText = 'PRE-BOOK';
    const preBookLink = this.page.getByText(prebookText);
    await preBookLink.click();
  }
}

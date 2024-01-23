import BasePage from './BasePage';

class LoungePage extends BasePage {
  async clickPrebook() {
    const prebookText = 'PRE-BOOK';
    const preBookLink = await this.page.getByText(prebookText);
    await preBookLink.click();
  }
}

module.exports = LoungePage;

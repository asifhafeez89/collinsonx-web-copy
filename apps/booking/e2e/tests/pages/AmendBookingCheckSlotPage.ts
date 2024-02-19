import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class AmendBookingCheckSlotPage extends BasePage {
  async clickProceed() {
    const selector = 'button[data-testid="submit"]';
    await this.page.waitForSelector(selector, {
      state: 'visible',
      timeout: 30000,
    });
    const proceedButton = await this.page.locator(selector);
    await proceedButton.click();
  }
}

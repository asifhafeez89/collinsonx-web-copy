import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class CancelledBookingConfirmationPage extends BasePage {
  async cancelledBookingConfirmationMessage() {
    const successText =
      baseTranslation.booking.cancellation.confirmation.title.Cancel;
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
      timeout: 60000,
    });
    return this.page.getByText(successText);
  }
}

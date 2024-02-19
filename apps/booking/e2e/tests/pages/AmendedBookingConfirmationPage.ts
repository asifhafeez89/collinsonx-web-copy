import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class AmendBookingConfirmationPage extends BasePage {
  async amendedBookingConfirmationMessage() {
    const successText =
      baseTranslation.booking.confirmationPayment.outcome.succesful.titleAmend;
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
      timeout: 30000,
    });
    return this.page.getByText(successText);
  }
}

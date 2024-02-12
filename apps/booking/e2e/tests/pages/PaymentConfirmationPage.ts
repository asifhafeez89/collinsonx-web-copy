import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

export default class PaymentConfirmationPage extends BasePage {
  async checkPaymentStatus(message: string) {
    this.page.getByText(`text=${message}`);
    return this.page.getByText(message);
  }

  async paymentConfirmationMessage() {
    const successText =
      baseTranslation.booking.confirmationPayment.outcome.succesful.title;
    return this.checkPaymentStatus(successText);
  }
}

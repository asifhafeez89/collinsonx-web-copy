import BasePage from './BasePage';

export default class PaymentConfirmationPage extends BasePage {
  async checkPaymentStatus(message: string) {
    this.page.getByText(`text=${message}`);
    return this.page.getByText(message);
  }

  async paymentConfirmationMessage() {
    const successText = 'Good news! Your booking has been confirmed';
    return this.checkPaymentStatus(successText);
  }
}

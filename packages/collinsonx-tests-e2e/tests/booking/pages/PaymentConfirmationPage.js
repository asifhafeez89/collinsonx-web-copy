class PaymentConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async checkPaymentStatus(message) {
    await this.page.getByText(`text=${message}`, {
      state: 'visible',
      timeout: 60000,
    });
    return await this.page.getByText(message);
  }

  async paymentConfirmationMessage() {
    const successText = 'Good news! Your booking has been confirmed';
    return this.checkPaymentStatus(successText);
  }
}

module.exports = PaymentConfirmationPage;

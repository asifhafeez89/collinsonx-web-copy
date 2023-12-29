class PaymentConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async checkPaymentStatus(message) {
    await this.page.waitForSelector(`text=${message}`, {
      state: 'visible',
      timeout: 60000,
    });
    return await this.page.getByText(message);
  }

  async paymentConfirmationMessage() {
    try {
      const successText = 'Good news! Your booking has been confirmed';
      return this.checkPaymentStatus(successText);
    } catch (err) {
      const confirmationDelayText = 'Booking confirmation delay';
      return this.checkPaymentStatus(confirmationDelayText);
    }
  }
}

module.exports = PaymentConfirmationPage;

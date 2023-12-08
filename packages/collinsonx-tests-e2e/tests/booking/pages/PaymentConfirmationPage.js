class PaymentConfirmationPage {
  constructor(page) {
    this.page = page;
  }

  async paymentConfirmationMessage() {
    const successText = 'Good news! Your booking has been confirmed';
    await this.page.waitForSelector(`text=${successText}`, {
      state: 'visible',
    });
    return await this.page.getByText(successText);
  }
}

module.exports = PaymentConfirmationPage;

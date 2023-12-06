class PaymentInfoPage {
  constructor(page) {
    this.page = page;
  }

  async getTitleRoot() {
    const element = await this.page.getByTestId('paymentInformation');
    return element.innerText();
  }

  async clickSubmit() {
    const stripeFrame = await this.page.frameLocator(
      'iframe[name="embedded-checkout"]'
    );
    await stripeFrame.getByTestId('hosted-payment-submit-button').click();
  }
}

module.exports = PaymentInfoPage;

class StripePaymentPage {
  constructor(page) {
    this.page = page;
    this.stripeIframe = null;
  }

  async getTitle() {
    // const titleSelector = '[data-testid="paymentInformation"]';
    // await this.page.waitForSelector(titleSelector, {
    //   visible: true,
    //   timeout: 5000,
    // });
    // const title = await this.page.$(titleSelector);
    // return title.innerText();
    const title = await this.page.getByTestId('paymentInformation');
    return title.innerText();
  }

  async setStripeIframe() {
    this.stripeIframe = await this.page.frameLocator(
      'iframe[name="embedded-checkout"]'
    );
  }

  async selectCountry(country) {
    await this.stripeIframe.locator('#billingCountry').selectOption(country);
  }

  async inputEmail(email) {
    const stripeEmailInput = await this.stripeIframe.locator(
      'input[name="email"]'
    );
    await stripeEmailInput.fill(email);
  }

  async inputCardNumber(cardNumber) {
    const cardNumberInput = await this.stripeIframe.locator(
      'input[name="cardNumber"]'
    );
    await cardNumberInput.fill(cardNumber);
  }

  async inputExpiry(expiry) {
    const cardExpiryInput = await this.stripeIframe.locator(
      'input[name="cardExpiry"]'
    );
    await cardExpiryInput.fill(expiry);
  }

  async inputCvc(cvc) {
    const cardCvcInput = await this.stripeIframe.locator(
      'input[name="cardCvc"]'
    );
    await cardCvcInput.fill(cvc);
  }

  async inputCardName(cardName) {
    const cardNameInput = await this.stripeIframe.locator(
      'input[name="billingName"]'
    );
    await cardNameInput.fill(cardName);
  }

  async inputAddressLine(addressLine) {
    const addressLineInput = await this.stripeIframe.locator(
      'input[name="billingAddressLine1"]'
    );
    await addressLineInput.fill(addressLine);
  }

  async inputAddressTown(town) {
    const addressTownInput = await this.stripeIframe.locator(
      'input[name="billingLocality"]'
    );
    await addressTownInput.fill(town);
  }

  async inputAddressPostalCode(postalCode) {
    const addressPostalCodeInput = await this.stripeIframe.locator(
      'input[name="billingPostalCode"]'
    );
    await addressPostalCodeInput.fill(postalCode);
  }

  async getPayButton() {
    const payButton = await this.stripeIframe.getByTestId(
      'hosted-payment-submit-button'
    );
    return payButton;
  }

  async clickPay() {
    const payButton = await this.getPayButton();
    await payButton.click();
  }
}

module.exports = StripePaymentPage;

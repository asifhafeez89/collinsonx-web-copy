class StripePaymentPage {
  constructor(page) {
    this.page = page;
    this.stripeIframe = null;
  }

  async getTitle() {
    const titleSelector = '[data-testid="paymentInformation"]';
    await this.page.waitForSelector(titleSelector, {
      visible: true,
      timeout: 60000,
    });
    const title = await this.page.locator(titleSelector);
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
    await cardNumberInput.type(cardNumber, { delay: 100 });
  }

  async inputExpiry(expiry) {
    const cardExpiryInput = await this.stripeIframe.locator(
      'input[name="cardExpiry"]'
    );
    await cardExpiryInput.type(expiry, { delay: 100 });
  }

  async inputCvc(cvc) {
    const cardCvcInput = await this.stripeIframe.locator(
      'input[name="cardCvc"]'
    );
    await cardCvcInput.type(cvc, { delay: 100 });
  }

  async inputCardName(cardName) {
    const cardNameInput = await this.stripeIframe.locator(
      'input[name="billingName"]'
    );
    await cardNameInput.type(cardName, { delay: 100 });
  }

  async inputAddressLine(addressLine) {
    const addressLineInput = await this.stripeIframe.locator(
      'input[name="billingAddressLine1"]'
    );
    await addressLineInput.type(addressLine, { delay: 100 });
  }

  async inputAddressTown(town) {
    const addressTownInput = await this.stripeIframe.locator(
      'input[name="billingLocality"]'
    );
    await addressTownInput.type(town, { delay: 100 });
  }

  async inputAddressPostalCode(postalCode) {
    const addressPostalCodeInput = await this.stripeIframe.locator(
      'input[name="billingPostalCode"]'
    );
    await addressPostalCodeInput.type(postalCode, { delay: 100 });
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

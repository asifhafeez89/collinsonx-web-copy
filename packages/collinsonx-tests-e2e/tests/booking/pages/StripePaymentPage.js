import BasePage from './BasePage';

class StripePaymentPage extends BasePage {
  constructor(page) {
    super(page);
    this.stripeIframe = null;
  }

  async getTitle() {
    const titleSelector = '[data-testid="paymentInformation"]';
    await this.page.waitForSelector(titleSelector, {
      visible: true,
      timeout: 10000,
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
    await this.page.waitForTimeout(500);
    await this.stripeIframe.locator('#billingCountry').selectOption(country);
  }

  async inputEmail(email) {
    await this.page.waitForTimeout(500);
    const stripeEmailInput = await this.stripeIframe.locator(
      'input[name="email"]'
    );
    await stripeEmailInput.fill(email);
  }

  async inputCardNumber(cardNumber) {
    await this.page.waitForTimeout(500);
    const cardNumberInput = await this.stripeIframe.locator(
      'input[name="cardNumber"]'
    );
    await cardNumberInput.fill(cardNumber);
  }

  async inputExpiry(expiry) {
    await this.page.waitForTimeout(500);
    const cardExpiryInput = await this.stripeIframe.locator(
      'input[name="cardExpiry"]'
    );
    await cardExpiryInput.fill(expiry);
  }

  async inputCvc(cvc) {
    await this.page.waitForTimeout(500);
    const cardCvcInput = await this.stripeIframe.locator(
      'input[name="cardCvc"]'
    );
    await cardCvcInput.fill(cvc);
  }

  async inputCardName(cardName) {
    await this.page.waitForTimeout(500);
    const cardNameInput = await this.stripeIframe.locator(
      'input[name="billingName"]'
    );
    await cardNameInput.fill(cardName);
  }

  async inputAddressLine(addressLine) {
    await this.page.waitForTimeout(500);
    const addressLineInput = await this.stripeIframe.locator(
      'input[name="billingAddressLine1"]'
    );
    await addressLineInput.fill(addressLine);
  }

  async inputAddressTown(town) {
    await this.page.waitForTimeout(500);
    const addressTownInput = await this.stripeIframe.locator(
      'input[name="billingLocality"]'
    );
    await addressTownInput.fill(town);
  }

  async inputAddressPostalCode(postalCode) {
    await this.page.waitForTimeout(500);
    const addressPostalCodeInput = await this.stripeIframe.locator(
      'input[name="billingPostalCode"]'
    );
    await addressPostalCodeInput.fill(postalCode);
  }

  async getPayButton() {
    const payButton = await this.stripeIframe.getByTestId(
      'hosted-payment-submit-button',
      { timeout: 30000 }
    );
    return payButton;
  }

  async clickPay() {
    const payButton = await this.getPayButton();
    await payButton.click();
  }
}

module.exports = StripePaymentPage;

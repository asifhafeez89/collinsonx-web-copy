import BasePage from './BasePage';
import { Page, Frame } from '@playwright/test';
import baseTranslation from '../../../locales/en';

export default class StripePaymentPage extends BasePage {
  stripeIframe: Frame;

  constructor(page: Page) {
    super(page);
    this.stripeIframe = {} as Frame;
  }

  async getTitle() {
    const titleSelector = '[data-testid="paymentInformation"]';
    await this.page.waitForSelector(titleSelector);
    const title = this.page.locator(titleSelector);
    return title.innerText();
  }

  async setStripeIframe() {
    const iframeHandle = await this.page.waitForSelector(
      'iframe[name="embedded-checkout"]'
    );
    this.stripeIframe = (await iframeHandle.contentFrame()) || ({} as Frame);
  }

  async selectCountry(country: string) {
    await this.page.waitForTimeout(500);
    await this.stripeIframe.locator('#billingCountry').selectOption(country);
  }

  async inputEmail(email: string) {
    await this.page.waitForTimeout(500);
    const stripeEmailInput = this.stripeIframe.locator('input[name="email"]');
    await stripeEmailInput.fill(email);
  }

  async inputCardNumber(cardNumber: string) {
    await this.page.waitForTimeout(500);
    const cardNumberInput = this.stripeIframe.locator(
      'input[name="cardNumber"]'
    );
    await cardNumberInput.fill(cardNumber);
  }

  async inputExpiry(expiry: string) {
    await this.page.waitForTimeout(500);
    const cardExpiryInput = this.stripeIframe.locator(
      'input[name="cardExpiry"]'
    );
    await cardExpiryInput.fill(expiry);
  }

  async inputCvc(cvc: string) {
    await this.page.waitForTimeout(500);
    const cardCvcInput = this.stripeIframe.locator('input[name="cardCvc"]');
    await cardCvcInput.fill(cvc);
  }

  async inputCardName(cardName: string) {
    await this.page.waitForTimeout(500);
    const cardNameInput = this.stripeIframe.locator(
      'input[name="billingName"]'
    );
    await cardNameInput.fill(cardName);
  }

  async inputAddressLine(addressLine: string) {
    await this.page.waitForTimeout(500);
    const addressLineInput = this.stripeIframe.locator(
      'input[name="billingAddressLine1"]'
    );
    await addressLineInput.fill(addressLine);
  }

  async inputAddressTown(town: string) {
    await this.page.waitForTimeout(500);
    const addressTownInput = this.stripeIframe.locator(
      'input[name="billingLocality"]'
    );
    await addressTownInput.fill(town);
  }

  async inputAddressPostalCode(postalCode: string) {
    await this.page.waitForTimeout(500);
    const addressPostalCodeInput = this.stripeIframe.locator(
      'input[name="billingPostalCode"]'
    );
    await addressPostalCodeInput.fill(postalCode);
  }

  async getPayButton() {
    const payButton = this.stripeIframe?.getByTestId(
      'hosted-payment-submit-button'
    );
    return payButton;
  }

  async clickPay() {
    const payButton = await this.getPayButton();
    await payButton.click();
  }

  paymentTitleText() {
    return baseTranslation.booking.payment.title;
  }
}

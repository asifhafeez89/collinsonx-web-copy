import BasePage from './BasePage';

export default class ConfirmBookingPage extends BasePage {
  async dateSelected(date: string) {
    return this.page.getByText(date);
  }

  async flightNumber(flightNumberString: string) {
    return this.page.getByText(flightNumberString);
  }

  async whosComing(whosComingString: string) {
    return this.page.getByText(whosComingString);
  }

  async loungeTime(loungeTimeString?: string) {
    return await this.page.evaluate((text) => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.find((element) => element.textContent?.trim() === text);
    }, loungeTimeString);
  }

  async clickGoToPayment() {
    const goToPaymentButtonSelector = 'button[data-testid="submit"]';
    await this.page.waitForSelector(goToPaymentButtonSelector, {
      state: 'visible',
      timeout: 30000,
    });
    const goToPaymentButton = await this.page.locator(
      goToPaymentButtonSelector
    );
    await goToPaymentButton.click();
  }
}

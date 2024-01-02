class ConfirmBookingPage {
  constructor(page) {
    this.page = page;
  }

  async dateSelected(date) {
    return await this.page.getByText(date);
  }

  async flightNumber(flightNumberString) {
    return await this.page.getByText(flightNumberString);
  }

  async whosComing(whosComingString) {
    return await this.page.getByText(whosComingString);
  }

  async loungeTime(loungeTimeString) {
    return await this.page.evaluate((text) => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.find((element) => element.textContent.trim() === text);
    }, loungeTimeString);
  }

  async clickGoToPayment() {
    const goToPaymentButtonSelector = 'button[data-testid="submit"]';
    await this.page.waitForSelector(goToPaymentButtonSelector, {
      visible: true,
      timeout: 30000,
    });
    const goToPaymentButton = await this.page.locator(
      goToPaymentButtonSelector
    );
    await goToPaymentButton.click();
  }
}

module.exports = ConfirmBookingPage;

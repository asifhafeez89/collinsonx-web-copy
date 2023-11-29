class ConfirmBookingPage {
  constructor(page) {
    this.page = page;
  }

  async dateSelected(date) {
    const dateSelectedSelector = `text=${date}`;
    await this.page.waitForSelector(dateSelectedSelector);
    return await this.page.$(dateSelectedSelector);
  }

  async flightNumber(flightNumberString) {
    const flightNumberSelector = `text=${flightNumberString}`;
    return await this.page.$(flightNumberSelector);
  }

  async whosComing(whosComingString) {
    const whosComingSelector = `text=${whosComingString}`;
    return await this.page.$(whosComingSelector);
  }

  async loungeTime(loungeTimeString) {
    return await this.page.evaluate((text) => {
      const elements = Array.from(document.querySelectorAll('*'));
      return elements.find((element) => element.textContent.trim() === text);
    }, loungeTimeString);
  }

  async clickSubmit() {
    const submitButtonSelector = 'button[type="submit"]';
    const submitButton = await this.page.$(submitButtonSelector);
    await submitButton.click();
  }
}

module.exports = ConfirmBookingPage;

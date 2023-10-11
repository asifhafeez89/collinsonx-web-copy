class ErrorPage {
  constructor(page) {
    this.page = page;
  }

  async serviceNotAvailableError() {
    const errorText = 'Sorry, service is not available';
    const errorSelector = `text=${errorText}`;
    await this.page.waitForSelector(errorSelector);
    return await this.page.$(errorSelector);
  }

  async loungeNotAvailableError() {
    const errorText = "Sorry we can't find the lounge you requested";
    const errorSelector = `text=${errorText}`;
    await this.page.waitForSelector(errorSelector);
    return await this.page.$(errorSelector);
  }
}

module.exports = ErrorPage;

import BasePage from './BasePage';

class ErrorPage extends BasePage {
  async serviceNotAvailableError() {
    const errorText = 'Sorry, service is not available';
    return await this.page.getByText(errorText);
  }

  async loungeNotAvailableError() {
    const errorText = "Sorry we can't find the lounge you requested";
    return await this.page.getByText(errorText);
  }
}

module.exports = ErrorPage;

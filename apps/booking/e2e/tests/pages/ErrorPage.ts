import BasePage from './BasePage';

export default class ErrorPage extends BasePage {
  async serviceNotAvailableError() {
    const errorText = 'Sorry, service is not available';
    return this.page.getByText(errorText);
  }

  async loungeNotAvailableError() {
    const errorText = "Sorry we can't find the lounge you requested";
    return this.page.getByText(errorText);
  }
}

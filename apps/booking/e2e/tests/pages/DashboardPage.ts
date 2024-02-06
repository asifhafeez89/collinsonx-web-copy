import BasePage from './BasePage';

export default class DashboardPage extends BasePage {
  async getWelcomeTextMessage() {
    const welcomeText = 'Welcome to your account';
    await this.page.waitForSelector(`text=${welcomeText}`, {
      state: 'visible',
      timeout: 10000,
    });
    return this.page.getByText(welcomeText);
  }
}

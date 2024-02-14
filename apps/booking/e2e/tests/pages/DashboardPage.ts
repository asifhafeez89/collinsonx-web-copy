import BasePage from './BasePage';

export default class DashboardPage extends BasePage {
  async getWelcomeTextMessage() {
    const welcomeText = 'Welcome to your account';
    await this.page.waitForSelector(`text=${welcomeText}`);
    return this.page.getByText(welcomeText);
  }
}

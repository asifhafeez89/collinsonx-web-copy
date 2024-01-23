import BasePage from './BasePage';

class DashboardPage extends BasePage {
  async getWelcomeTextMessage() {
    const welcomeText = 'Welcome to your account';
    await this.page.waitForSelector(`text=${welcomeText}`, {
      state: 'visible',
      timeout: 10000,
    });
    return await this.page.getByText(welcomeText);
  }
}

module.exports = DashboardPage;

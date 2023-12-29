class UpdateDetailsPage {
  constructor(page) {
    this.page = page;
  }

  async clickLogin() {
    const loginButtonSelector = 'button[data-testid="loginAfterSignUp"]';
    const loginButton = await this.page.$(loginButtonSelector);
    await loginButton.click();
  }
}

module.exports = UpdateDetailsPage;

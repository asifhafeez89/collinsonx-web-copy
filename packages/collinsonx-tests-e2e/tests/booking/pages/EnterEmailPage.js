class EnterEmailPage {
  constructor(page) {
    this.page = page;
  };

  async title() {
    return await this.page.innerText('h1');
  };

  async enterEmail(email) {
    return await this.page.getByTestId('loginEmailAddress').fill(email)
  }

  async clickContinue() {
    return await this.page.getByTestId('login').click();
  }
};

module.exports = EnterEmailPage;
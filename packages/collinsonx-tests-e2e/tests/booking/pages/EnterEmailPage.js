class LoginPage {
  constructor(page) {
    this.page = page;
  };

  async getTitle() {
    return await this.page.getByTestId('loginEmailAddress');

  };
};

module.exports = LoginPage;
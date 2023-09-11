class LoginPage {
  constructor(page) {
    this.page = page;
  };

  async getTitle() {
    return await this.page.innerText('h1');
  };
};

module.exports = LoginPage;
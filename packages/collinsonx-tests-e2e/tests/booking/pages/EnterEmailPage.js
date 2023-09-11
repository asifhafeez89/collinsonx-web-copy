class LoginPage {
  constructor(page) {
    this.page = page;
  };

  async title() {
    return await this.page.innerText('h1');
  };
};

module.exports = LoginPage;
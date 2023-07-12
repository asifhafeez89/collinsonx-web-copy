class CheckEmailPage {
  constructor(page) {
    this.page = page;
  };

  getVerifyButton() {
    return this.page.getByTestId('verify');
  };
};

module.exports = CheckEmailPage;
class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async clickConfirm() {
    const confirmButton = await this.page.getByTestId('loginAfterSignUp');
    return await confirmButton.click();
  }
}

module.exports = RegistrationPage;

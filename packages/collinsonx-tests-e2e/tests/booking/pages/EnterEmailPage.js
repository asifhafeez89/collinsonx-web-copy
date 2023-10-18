class EnterEmailPage {
  constructor(page) {
    this.page = page;
  }

  async title() {
    return await this.page.innerText('h1');
  }

  async emailInputValue() {
    const emailInputElement = await this.page.getByTestId('loginEmailAddress');
    return await emailInputElement.getAttribute('value');
  }

  async enterEmail(email) {
    return await this.page.getByTestId('loginEmailAddress').fill(email);
  }

  async clickContinue() {
    return await this.page.getByTestId('login').click();
  }

  async incorrectEmailError() {
    const errorText =
      'Please enter the correct email address or call support as this account is already linked to a different email address';
    const errorSelector = `text=${errorText}`;
    await this.page.waitForSelector(errorSelector);
    return await this.page.$(errorSelector);
  }
}

module.exports = EnterEmailPage;

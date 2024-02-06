import BasePage from './BasePage';

export default class EnterEmailPage extends BasePage {
  async title() {
    return await this.page.innerText('h1');
  }

  async emailInputValue() {
    const emailInputElement = this.page.getByTestId('loginEmailAddress');
    return await emailInputElement.getAttribute('value');
  }

  async enterEmail(email: string) {
    return await this.page.getByTestId('loginEmailAddress').fill(email);
  }

  async clickContinue() {
    return await this.page.getByTestId('login').click();
  }

  async incorrectEmailError() {
    const errorText =
      'Please enter the correct email address or call support as this account is already linked to a different email address';
    return this.page.getByText(errorText);
  }
}

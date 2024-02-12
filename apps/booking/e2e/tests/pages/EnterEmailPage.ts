import BasePage from './BasePage';
import baseTranslation from '../../../locales/en';

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
    const errorText = baseTranslation.auth.login.error.emailError;
    return this.page.getByText(errorText);
  }

  async wrongEmailFormatError() {
    const errorText = baseTranslation.auth.login.error.emailFormat;
    return this.page.getByText(errorText);
  }

  emailTitleText() {
    return baseTranslation.auth.login.email.title;
  }
}

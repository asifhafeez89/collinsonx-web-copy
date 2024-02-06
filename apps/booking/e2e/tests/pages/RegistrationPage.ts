import BasePage from './BasePage';

export default class RegistrationPage extends BasePage {
  async firstNameInput() {
    return this.page.getByTestId('firstName');
  }

  async lastNameInput() {
    return this.page.getByTestId('lastName');
  }

  async firstNameValue() {
    return (await this.firstNameInput()).getAttribute('value');
  }

  async lastNameValue() {
    return (await this.lastNameInput()).getAttribute('value');
  }

  async emailValue() {
    await this.page.waitForSelector('.mantine-Input-input');
    const inputElements = await this.page.$$('.mantine-Input-input');
    const emailInput = inputElements[2];
    return await emailInput.getAttribute('value');
  }

  async clickLogin() {
    const loginButtonSelector = 'button[data-testid="loginAfterSignUp"]';
    const loginButton = await this.page.locator(loginButtonSelector);
    await loginButton.click();
  }
}

import BasePage from './BasePage';

export default class LoginPage extends BasePage {
  async clickAcceptAllCookies() {
    const acceptAllCookies = this.page.locator(
      'button[id="onetrust-accept-btn-handler"]'
    );
    await acceptAllCookies.click();
  }

  async openSignInOption() {
    const signInOption = this.page.locator('button[id="sign-in__accordion-0"]');
    await signInOption.click();
  }

  async inputUsername(existingUsername: string) {
    const usernameInput = this.page.locator('input[id="Username_FormField"]');
    await usernameInput.fill(existingUsername);
  }

  async inputPassword(existingUserPassword: string) {
    const passwordInput = this.page.locator('input[id="Password_FormField"]');
    await passwordInput.fill(existingUserPassword);
  }

  async clickSubmit() {
    const loginButton = await this.page.waitForSelector('.partial-submit');
    await loginButton.click();
  }
}

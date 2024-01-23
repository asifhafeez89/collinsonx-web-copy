import BasePage from './BasePage';

class LoginPage extends BasePage {
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

  async inputUsername(existingUsername) {
    const usernameInput = this.page.locator('input[id="Username_FormField"]');
    await usernameInput.fill(existingUsername);
  }

  async inputPassword(existingUserPassword) {
    const passwordInput = this.page.locator('input[id="Password_FormField"]');
    await passwordInput.fill(existingUserPassword);
  }

  async clickSubmit() {
    const loginButton = await this.page.waitForSelector('.partial-submit');
    await loginButton.click();
  }
}

module.exports = LoginPage;

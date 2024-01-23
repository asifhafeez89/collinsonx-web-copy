import BasePage from './BasePage';

class EnterPinPage extends BasePage {
  async enterPin(code) {
    const selector = `[data-testid="pinInput"] >> div:first-child > input:first-child`;
    await this.page.waitForSelector(selector);
    const pinInput = await this.page.$(selector);
    await pinInput.click();
    return await this.page.keyboard.type(code);
  }

  async clickVerify() {
    const verifyButton = await this.page.getByTestId('verify');
    return await verifyButton.click();
  }

  async invalidCodeError() {
    const errorText = 'Passcode may be incorrect or expired.';
    return await this.page.getByText(errorText);
  }

  async tooManyAttemptsError() {
    const errorText = 'Sorry, passcode not verified';
    return await this.page.getByText(errorText);
  }

  async clickReEnterEmailLink() {
    const reEnterEmailLinkText = 'Re-enter your email address';
    const reEnterEmailLinkSelector = `text=${reEnterEmailLinkText}`;
    await this.page.waitForSelector(reEnterEmailLinkSelector);
    const reEnterEmailLinkElement = await this.page.$(reEnterEmailLinkSelector);
    await reEnterEmailLinkElement.click();
  }
}

module.exports = EnterPinPage;

class EnterPinPage {
  constructor(page) {
    this.page = page;
  }

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
    const errorSelector = `text=${errorText}`;
    await this.page.waitForSelector(errorSelector);
    return await this.page.$(errorSelector);
  }

  async tooManyAttemptsError() {
    const errorText = 'Sorry, passcode not verified';
    const errorSelector = `text=${errorText}`;
    await this.page.waitForSelector(errorSelector);
    return await this.page.$(errorSelector);
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

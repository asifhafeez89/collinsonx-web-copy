class EnterPinPage {
  constructor(page) {
    this.page = page;
  }

  async enterPin(code) {
    const pinInput = await this.page.$(
      `[data-testid="pinInput"] >> div:first-child > input:first-child`
    );
    await pinInput.click();
    return await this.page.keyboard.type(code);
  }

  async clickVerify() {
    const verifyButton = await this.page.getByTestId('verify');
    return await verifyButton.click();
  }
}

module.exports = EnterPinPage;

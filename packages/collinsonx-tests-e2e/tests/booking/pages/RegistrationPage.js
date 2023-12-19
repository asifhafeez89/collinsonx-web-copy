class RegistrationPage {
  constructor(page) {
    this.page = page;
  }

  async firstNameInput() {
    return await this.page.getByTestId('firstName');
  }

  async lastNameInput() {
    return await this.page.getByTestId('lastName');
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

  async clickConfirm() {
    const confirmButton = await this.page.getByTestId('loginAfterSignUp');
    return await confirmButton.click();
  }
}

module.exports = RegistrationPage;
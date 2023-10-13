class SelectLoungeTimePage {
  constructor(page) {
    this.page = page;
  }

  async openLoungeTimeDropdown() {
    await this.page.waitForLoadState('networkidle');
    const timeSelector = '[placeholder="Select time"]';
    const timeSelectorElement = await this.page.waitForSelector(timeSelector);
    await timeSelectorElement.scrollIntoViewIfNeeded();
    await timeSelectorElement.click();
  }

  async selectFirstLoungeTime() {
    const dropdownSelector = '.mantine-Select-dropdown';
    await this.page.waitForSelector(dropdownSelector);
    const dropdownElement = await this.page.$(dropdownSelector);
    await dropdownElement.click();
  }

  async clickConfirmButton() {
    const confirmButtonSelector = '[type="submit"]';
    await this.page.waitForSelector(confirmButtonSelector, {
      visible: true,
      timeout: 5000,
    });

    const confirmButton = await this.page.$(confirmButtonSelector);
    await confirmButton.click();
  }
}

module.exports = SelectLoungeTimePage;

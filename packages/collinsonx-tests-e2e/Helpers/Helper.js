class Helper {
  constructor(page) {
    this.page = page;
  }

  async wait(time) {
    await this.page.waitForTimeout(time);
  }

  async type(words) {
    await this.page.keyboard.type(words);
  }

  async acceptAlert() {
    await this.page.on('dialog', dialog => dialog.accept());

  }
}
module.exports = Helper;


class Helper {
  constructor(page) {
    this.page = page
    
  }

  async wait(time) {
  await this.page.waitForTimeout(time);
  }

  async type(words) {
    await this.page.keyboard.type(words);
    }
}
module.exports = Helper;

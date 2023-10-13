class PreBookPage {
  constructor(page) {
    this.page = page;
  }

  async loungeTitle() {
    return await this.page.getByTestId('loungeName').innerText();
  }
}

module.exports = PreBookPage;

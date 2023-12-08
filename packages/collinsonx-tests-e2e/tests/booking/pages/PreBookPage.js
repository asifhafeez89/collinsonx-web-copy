class PreBookPage {
  constructor(page) {
    this.page = page;
  }

  async loungeTitle() {
    await this.page.waitForTimeout(1000);
    const loungeNameElement = await this.page.waitForSelector(
      '[data-testid="loungeName"]'
    );
    const loungeNameText = await loungeNameElement.innerText();
    return loungeNameText;
  }

  async airportAndTerminalElement(airportAndTerminal) {
    const airportAndTerminalSelector = `text=${airportAndTerminal}`;
    return await this.page.$(airportAndTerminalSelector);
  }

  async priceElement(price) {
    const priceSelector = `text=${price}`;
    return await this.page.$(priceSelector);
  }

  async openDatePicker() {
    const datePicker = await this.page.waitForSelector(
      '.mantine-DatePickerInput-input'
    );
    await datePicker.click();
  }

  async clickNextMonth() {
    const nextMonth = await this.page.waitForSelector('[data-next="true"]');
    await nextMonth.click();
  }

  async selectDate(dateString) {
    const dateSelector = `[aria-label="${dateString}"]`;
    const date = await this.page.waitForSelector(dateSelector);
    await date.click();
    await this.page.waitForTimeout(500);
  }

  async inputFlightNumber(flightNumber) {
    await this.page.waitForLoadState('networkidle');
    const flightNumberInput = await this.page.waitForSelector(
      'input[data-testid="flightNumber"]'
    );
    await flightNumberInput.type(flightNumber, { delay: 200 });
  }

  async increaseAdultGuests() {
    const increaseAdultsButtonSelector = 'button:has-text("+")';
    const increaseAdultsButton = await this.page.$(
      increaseAdultsButtonSelector
    );
    await increaseAdultsButton.click();
  }

  async clickSubmit() {
    const submitButtonSelector = 'button[type="submit"]';
    const submitButton = await this.page.$(submitButtonSelector);
    await submitButton.click();
  }

  async invalidFlightError() {
    const errorText =
      'Flight details not recognised. Please check and try again.';
    const errorSelector = `text=${errorText}`;
    return await this.page.waitForSelector(errorSelector);
  }

  async flightDateError() {
    const errorText = 'Must provide date of flight.';
    const errorSelector = `text=${errorText}`;

    return await this.page.waitForSelector(errorSelector);
  }

  async airportMismatchWarning() {
    const warningText = `Airports don't match`;
    const warningSelector = `text=${warningText}`;
    return await this.page.$(warningSelector);
  }
}

module.exports = PreBookPage;

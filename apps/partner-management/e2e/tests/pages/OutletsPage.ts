import { Page } from '@playwright/test';
import { CARDS_LIMIT } from 'config';
import { expect } from '../baseFixtures';

export default class OutletsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async title() {
    await this.page.getByTestId('outlet-listing-container');
    return this.page.getByRole('heading', {
      name: 'Outlets',
    });
  }

  async pagination() {
    return await this.page.getByTestId('outlets-pagination');
  }

  goToURL() {
    return this.page.goto('/outlets', { waitUntil: 'networkidle' });
  }

  goToURLFilterByPartnerBrandId(partnerBrandId: string) {
    return this.page.goto(`/outlets?partner=${partnerBrandId}`, {
      waitUntil: 'networkidle',
    });
  }

  firstOuletCardTitle() {
    return this.page.getByTestId('outlet-card-title').first().innerText();
  }

  firstOuletCardSubtitle() {
    return this.page.getByTestId('outlet-card-subtitle').first().innerText();
  }

  clickFirstOutletCardViewDetailsButton() {
    return this.page.getByTestId('view-details-button').first().click();
  }

  outletCards() {
    return this.page.getByTestId('outlet-card').all();
  }

  /**
   *
   * @param number Outlet number in terms of the order they are displayed in the UI e.g. number 1 will be the first outlet card in the list
   */
  outletCardTitle(number: number) {
    return this.outletCard(number).getByTestId('outlet-card-title');
  }

  /**
   *
   * @param number Outlet number in terms of the order they are displayed in the UI e.g. number 1 will be the first outlet card in the list
   */
  outletCardSubtitle(number: number) {
    return this.outletCard(number).getByTestId('outlet-card-subtitle');
  }

  /**
   *
   * @param number Outlet number in terms of the order they are displayed in the UI e.g. number 1 will be the first outlet card in the list
   */
  outletCard(number: number) {
    return this.page.getByTestId('outlet-card').nth(number - 1);
  }

  previousPageButton() {
    return this.pageNavigationButtons().first();
  }

  currentPaginationButton() {
    return this.page.locator('button[data-active="true"]');
  }

  nextPageButton() {
    return this.pageNavigationButtons().last();
  }
  /**
   *
   * @param page The pagination button element that will be returned
   * @returns The requested pagination button's element
   */
  paginationButton(page: number) {
    return this.pageNavigationButtons().getByText(page.toString(), {
      exact: true,
    });
  }

  pageNavigationButtons() {
    return this.pageNavigator().getByRole('button');
  }

  pageNavigator() {
    return this.page.getByTestId('outlets-pagination');
  }

  async assertCorrectNumberOfOutletsAreDisplayed(expectedNumber: number) {
    const outletCards = await this.outletCards();
    const totalCardsDisplayed = outletCards.length;

    expect(totalCardsDisplayed).toEqual(expectedNumber);
  }

  async assertCorrectOutletsAreDisplayed(outletsList: any) {
    for (let i = 0; i < CARDS_LIMIT; i++) {
      let cardNumber = i + 1;
      let outletCardTitle = this.outletCardTitle(cardNumber);
      let outletCardSubitle = this.outletCardSubtitle(cardNumber);

      // mimic the front-end conditional logic for displaying the subtitle
      let outletLocation = outletsList[i].location;
      let formattedSubtitle = outletLocation.terminal
        ? `${outletLocation.name}, ${outletLocation.terminal}`
        : outletLocation.name;

      await expect(outletCardTitle).toHaveText(outletsList[i].name);
      await expect(outletCardSubitle).toHaveText(formattedSubtitle);
    }
  }
}

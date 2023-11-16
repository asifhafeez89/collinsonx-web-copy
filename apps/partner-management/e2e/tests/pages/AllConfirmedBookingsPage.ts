import { Page } from '@playwright/test';

export default class AllConfirmedBookingsPage {
  private page: Page;
  private checkCustomerInButton: any;

  constructor(page: Page, bookingRef?: string) {
    this.page = page;
    this.checkCustomerInButton = this.page
      .getByRole('row', { name: bookingRef })
      .getByTestId('checkCustomerIn');
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Confirmed lounge booking management',
    });
  }

  checkCustomerIn() {
    this.checkCustomerInButton.click();
    this.page.getByRole('checkbox').click();
    return this.page.getByRole('button', { name: 'Check in' }).click();
  }

  waitForCheckedInElement() {
    return this.checkCustomerInButton.waitFor({ state: 'detached' });
  }

  goToURL() {
    return this.page.goto('/bookings/confirmed', { waitUntil: 'networkidle' });
  }
}

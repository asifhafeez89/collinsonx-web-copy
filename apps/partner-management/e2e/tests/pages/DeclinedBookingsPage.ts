import { Page } from '@playwright/test';

export default class DeclinedBookingsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  title() {
    return this.page.getByRole('heading', {
      name: 'Declined lounge booking management',
    });
  }

  goToURL() {
    return this.page.goto('/bookings/declined', { waitUntil: 'networkidle' });
  }
}

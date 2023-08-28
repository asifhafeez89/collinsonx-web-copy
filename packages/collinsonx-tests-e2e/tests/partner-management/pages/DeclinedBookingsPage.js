class DeclinedBookingsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Declined lounge booking management' });
    };

    goToURL() {
        return this.page.goto('/bookings/declined', { waitUntil: "networkidle" });
    };
};

module.exports = DeclinedBookingsPage;
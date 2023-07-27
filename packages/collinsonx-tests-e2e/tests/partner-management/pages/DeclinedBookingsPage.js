class DeclinedBookingsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Declined lounge booking management' });
    };
};

module.exports = DeclinedBookingsPage;
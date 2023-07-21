class PendingRequestsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Pending lounge booking management' });
    };
};

module.exports = PendingRequestsPage;
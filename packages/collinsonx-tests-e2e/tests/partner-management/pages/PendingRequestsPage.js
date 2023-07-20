class PendingRequestsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Pending lounge booking management' });
    };

    async declinePendingRequest(bookingRef) {
        const declineButton = await this.page.getByRole('row', { name: bookingRef }).getByTestId('declineBooking')
        return declineButton.click();
    };
};

module.exports = PendingRequestsPage;
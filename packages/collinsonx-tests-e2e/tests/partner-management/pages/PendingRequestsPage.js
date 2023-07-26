class PendingRequestsPage {
    constructor(page) {
        this.page = page;
    };

    title() {
        return this.page.getByRole('heading', { name: 'Pending lounge booking management' });
    };

    async declinePendingRequest(bookingRef) {
        return await this.page.getByRole('row', { name: bookingRef }).getByTestId('declineBooking').click();
    };

    async confirmPendingRequest(bookingRef) {
        return await this.page.getByRole('row', { name: bookingRef }).getByTestId('confirmBooking').click();
    };

    async waitForPendingRequestToBeRemoved(bookingRef) {
        return await this.page.getByRole('row', { name: bookingRef }).waitFor({ state: "detached" });
    };
};

module.exports = PendingRequestsPage;
import LoginPage from "../pages/LoginPage";

class Login {
    constructor(page) {
        this._loginPage = new LoginPage(page)
    }

    goTo() {
        return this._loginPage.getURL()
    }

    typeIn() {
        return this._loginPage.getUsernameTextbox(this.page).fill("TEST");
    }
}

module.exports = Login;

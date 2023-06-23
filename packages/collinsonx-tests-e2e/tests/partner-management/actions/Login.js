import LoginPage from '../pages/LoginPage';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
  };

  async asNewUser(boolean) {
    await this._loginPage.goToURL();

    const email = this.setUser(boolean);

    await this._loginPage.enterEmailAddress(email);

    // password will be changed and added to secret variables at a later date
    await this._loginPage.enterPassword('CollinsonXPartner123');

    await this._loginPage.saveMyPassword();

    await this._loginPage.login();
  };

  // logic for new user is not currently used - will be added after current user tests
  setUser(isNewPartner) {
    let partner;

    if (isNewPartner == true) {
      user = uuidv4();
    } else {
      partner = 'automationuserpartner';
    }

    return `${partner}@clearroute.testinator.com`;
  };

};

module.exports = Login;
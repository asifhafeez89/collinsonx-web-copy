import LoginPage from '../pages/LoginPage';
import CheckEmailPage from '../pages/CheckEmailPage';
import { v4 as uuidv4 } from 'uuid';
import { MailinatorClient, GetInboxRequest, GetMessageRequest } from 'mailinator-client';
import Helper from '../../helpers/Helper';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
    this._helper = new Helper(page);
    this._checkEmailPage = new CheckEmailPage(page);
  }

  goTo() {
    return this._loginPage.getURL();
  }

  async login() {
    let uuid = uuidv4();
    let email = uuid + '@clearrouteteam.testinator.com';

    await this._loginPage.getEmailAddressTextbox(this.page).fill(email);
    await this._loginPage.getLoginButton(this.page).click();
    await this._helper.wait(5000);

    const otp = await this._getOTP(uuid);

    await this._helper.type(otp);
    await this._checkEmailPage.getVerifyButton(this.page).click();
    await this._helper.wait(5000);
  }

  async _getOTP(user) {
    const mailinatorClient = new MailinatorClient(
      '2a32de31d6734501abb238da21c9ac3a'
    );

    let id;

    for (let i = 1; i++; i <= 5) {
      try {
        const inbox = await mailinatorClient.request(
          new GetInboxRequest('clearrouteteam.testinator.com')
        );
        const latestMessage = inbox.result.msgs.find(
          (message) => message.to === user
        );
        id = latestMessage.id;
        break;
      } catch {
        await this._helper.wait(3000);
      }
    }

    const otp = await mailinatorClient.request(
      new GetMessageRequest('clearrouteteam.testinator.com', user, id)
    );
    const regex = /(\d{6})<\/div>/g;
    const match = regex.exec(otp.result.parts[0].body);

    return match[1].toString();
  }
}

module.exports = Login;

import LoginPage from '../pages/LoginPage';
import { v4 as uuidv4 } from 'uuid';
import { MailinatorClient } from 'mailinator-client';
import { GetInboxRequest } from 'mailinator-client';
import { GetMessageRequest } from 'mailinator-client';
import Helper from '../../Helpers/Helper';

class Login {
  constructor(page) {
    this._loginPage = new LoginPage(page);
    this._helper = new Helper(page);
  }

  goTo() {
    return this._loginPage.getURL();
  }

  async login() {
    let uuid = uuidv4();
    let email = uuid + '@clearrouteteam.testinator.com';

    await this._loginPage.getUsernameTextbox(this.page).fill(email);
    await this._loginPage.getLoginButton(this.page).click();
    await this._helper.wait(5000);

    const otp = await this._getOTP(uuid);

    await this._helper.type(otp);
    await this._loginPage.getVerifyButton(this.page).click();
    await this._helper.wait(5000);
  }

  async _getOTP(uuid) {
    let id;
    const mailinatorClient = new MailinatorClient(
      '2a32de31d6734501abb238da21c9ac3a'
    );

    await mailinatorClient
      .request(new GetInboxRequest('clearrouteteam.testinator.com'))
      .then((response) => {
        const result = response.result;
        const msgs = result?.msgs;

        if (msgs !== undefined) {
          msgs.forEach((msg) => {
            const to = msg.to;
            
            if (to == uuid) {
              id = msg.id;
            }
          });
        }
      });

    const otp = await mailinatorClient
      .request(new GetMessageRequest('clearrouteteam.testinator.com', uuid, id))
      .then((response) => {
        const result = response.result;
        const parts = result?.parts;
        const regex = /(\d{6})<\/div>/g;
        let match = regex.exec(parts[0].body);

        return match[1].toString();
      });
    return otp;
  }
}

module.exports = Login;

import axios from 'axios';
import { supertokensURL } from './config';
import {
  DeleteInboxMessagesRequest,
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from 'mailinator-client';

export default class Authenticate {
  async asASuperUser(email?: string, password?: string) {
    if (!email || !password) {
      email = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
      password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];
    }

    const body = {
      formFields: [
        {
          id: 'email',
          value: email,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      rid: 'emailpassword',
      'st-auth-mode': 'header',
    };

    const response = await axios.post(`${supertokensURL}/signin`, body, {
      headers,
    });

    return response.headers['st-access-token'];
  }

  /**
   * Authenticate as a consumer against the GraphQL API.
   * @param {string} email - consumer's email used to obtain OTP.
   */
  async asAConsumer(email: string) {
    const body = {
      email,
    };

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      rid: 'thirdpartypasswordless',
      'st-auth-mode': 'header',
    };

    const response = await axios.post(`${supertokensURL}/signinup/code`, body, {
      headers,
    });

    const deviceId = response.data.deviceId;
    const preAuthSessionId = response.data.preAuthSessionId;

    const emailPrefix = email.split('@')[0];

    const mailinatorClient = new MailinatorClient(
      process.env.MAILINATOR_API_TOKEN!
    );
    await mailinatorClient.request(
      new DeleteInboxMessagesRequest(
        process.env.MAILINATOR_EMAIL_ADDRESS!,
        emailPrefix
      )
    );

    let latestMessage;
    let count = 0;

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(process.env.MAILINATOR_EMAIL_ADDRESS!)
      );

      latestMessage = await inbox.result?.msgs.find(
        (message) => message.to === emailPrefix
      );

      count++;
    }

    if (latestMessage === undefined) {
      throw new Error(
        "Could not find the OTP email. Check the user's email is correct in relation to the Mailinator account being used."
      );
    }

    const id = latestMessage.id;

    const otp = await mailinatorClient.request(
      new GetMessageRequest(
        process.env.MAILINATOR_EMAIL_ADDRESS!,
        emailPrefix,
        id
      )
    );

    if (otp.result === null) {
      throw new Error(
        'Unable to authenticate as a consumer. Could not find the Email containing the OTP.'
      );
    }

    const regex = /(\d{6})<\/div>/g;
    const match = regex.exec(otp.result.parts[0].body);

    if (match === null) {
      throw new Error(
        'The regex condition could not find a OTP within the email.'
      );
    }

    const userInputCode = match[1].toString();

    const consumeRequest = {
      deviceId,
      preAuthSessionId,
      userInputCode,
    };

    const consumeResponse = await axios.post(
      `${supertokensURL}/signinup/code/consume`,
      consumeRequest,
      { headers }
    );

    return consumeResponse.headers['st-access-token'];
  }
}

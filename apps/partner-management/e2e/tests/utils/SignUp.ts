import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from 'mailinator-client';
import axios from 'axios';
import { apiURL, supertokensURL } from './config';
import TestSetup from '../utils/TestSetup';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.tests` });

export default class SignUp {
  /**
   * @param {object} lounge - lounge object created from the TestSetup class. Used to access properties such as experienceId.
   */
  async receiveRegistrationEmail(lounge: TestSetup, email: string) {
    const authorisationToken = await this.authenticateAsSuperUser();
    const mutation = `
        mutation mutation($invitationInput: InvitationInput) {
          createInvitation(invitationInput: $invitationInput) {
            id
            experience {
              id
            }
            expiresAt
          }
        }
      `;

    const variables = {
      invitationInput: {
        inviteeEmail: email,
        userType: 'PARTNER',
        experience: {
          id: lounge.experienceId,
        },
      },
    };

    const request = {
      query: mutation,
      variables: variables,
    };

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${authorisationToken}`,
      'Content-Type': 'application/json',
    };

    const response = await axios.post(apiURL, request, { headers });

    const createInvitationObj = response.data.data.createInvitation;

    if (createInvitationObj === null) {
      throw new Error(
        'The createInvitation response object is null. The registration email was unable to be sent out. The method of authorisation, or the credentials themselves, may be incorrect.'
      );
    }
  }

  async getRegistrationURL(email: string) {
    const username = email.split('@')[0];

    const mailinatorClient = new MailinatorClient(
      process.env.MAILINATOR_API_TOKEN!
    );

    try {
      let latestMessage;
      let count = 0;

      while (latestMessage === undefined && count < 3) {
        count > 0 &&
          (await new Promise((resolve) => setTimeout(resolve, 5000)));

        const inbox = await mailinatorClient.request(
          new GetInboxRequest(process.env.MAILINATOR_EMAIL_ADDRESS!)
        );

        latestMessage = await inbox.result?.msgs.find(
          (message) => message.to === username
        );

        count++;
      }

      if (latestMessage === undefined) {
        throw new Error(
          "Could not find the OTP email. Check the user's email is correct in relation to the Mailinator account being used."
        );
      }

      const id = latestMessage.id;

      const latestMessageContents = await mailinatorClient.request(
        new GetMessageRequest(
          process.env.MAILINATOR_EMAIL_ADDRESS!,
          username,
          id
        )
      );

      const regex = /https.*?(?=\])/;

      if (latestMessageContents.result === null) {
        throw new Error('');
      }

      const url = regex.exec(latestMessageContents.result.parts[0].body);

      if (url === null) {
        throw new Error(
          'The regex condition could not find the new partner registration url link within the email. Could not register the new partner.'
        );
      }

      const formattedURL = url[0]
        .toString()
        .replace(/(&#x2F;)/g, '/')
        .replaceAll('&#x3D;', '=');

      return formattedURL;
    } catch (err) {
      throw err;
    }
  }

  async authenticateAsSuperUser() {
    const username = process.env['SUPER_USER_USERNAME_' + process.env.ENV];
    const password = process.env['SUPER_USER_PASSWORD_' + process.env.ENV];

    const body = {
      formFields: [
        {
          id: 'email',
          value: username,
        },
        {
          id: 'password',
          value: password,
        },
      ],
    };

    const response = await axios.post(`${supertokensURL}/signin`, body, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        rid: 'emailpassword',
        'st-auth-mode': 'header',
      },
    });

    return response.headers['st-access-token'];
  }
}

import { v4 as uuidv4 } from 'uuid';
import {
  MailinatorClient,
  GetInboxRequest,
  GetMessageRequest,
} from 'mailinator-client';
import axios from 'axios';
import dotenv from 'dotenv';
import { apiURL, supertokensURL } from './config';
dotenv.config({ path: `.env.tests` });

class PartnerUtils {
  /**
   *
   * @param {string} experienceId - Experience ID to associate with the partner.
   * @param {object} request - Playwright object used to send API requests.
   */
  constructor(experienceId, request) {
    this.experienceId = experienceId;
    this.request = request;
    this.partnerEmail = `${uuidv4()}@${process.env.MAILINATOR_EMAIL_ADDRESS}`;
    this.password = uuidv4();
  }

  async signUp() {
    this.receiveRegistrationEmail();
    const invitationToken = await this.getInvitationToken();
    await this.registerAsANewPartner(invitationToken);
    return {
      email: this.partnerEmail,
      password: this.password,
    };
  }

  async receiveRegistrationEmail() {
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
        inviteeEmail: this.partnerEmail,
        userType: 'PARTNER',
        experience: {
          id: this.experienceId,
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

  async getInvitationToken() {
    const emailPrefix = this.partnerEmail.split('@')[0];

    const mailinatorClient = new MailinatorClient(
      process.env.MAILINATOR_API_TOKEN
    );

    let latestMessage;
    let count = 0;

    while (latestMessage === undefined && count < 3) {
      count > 0 && (await new Promise((resolve) => setTimeout(resolve, 5000)));

      const inbox = await mailinatorClient.request(
        new GetInboxRequest(process.env.MAILINATOR_EMAIL_ADDRESS)
      );

      latestMessage = await inbox.result.msgs.find(
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

    const latestMessageContents = await mailinatorClient.request(
      new GetMessageRequest(
        process.env.MAILINATOR_EMAIL_ADDRESS,
        emailPrefix,
        id
      )
    );

    if (
      !latestMessageContents ||
      !latestMessageContents.result ||
      !latestMessageContents.result.parts[0]
    ) {
      throw new Error('Latest message contents not found');
    }

    const encodedUrl = this.getEncodedUrlFromMessageContents(
      latestMessageContents.result.parts[0].body
    );
    const invitationToken = encodedUrl.split('invitation=')[1];
    if (!invitationToken) {
      throw new Error('Invitation token not found');
    }

    return invitationToken;
  }

  getEncodedUrlFromMessageContents(messageContents) {
    const regex = /https.*?(?=\])/;
    const urlMatch = regex.exec(messageContents);
    return urlMatch
      ? urlMatch[0].replace(/&#x2F;/g, '/').replace(/&#x3D;/g, '=')
      : '';
  }

  /**
   *
   * @param {string} invitationToken - Token retrieved from the registration Email as a form of authentication.
   */
  async registerAsANewPartner(invitationToken) {
    const authorisationToken = await this.authenticateAsSuperUser();

    const query = `mutation Mutation($acceptInvitationInput: AcceptInvitationInput!) {
      acceptInvitation(acceptInvitationInput: $acceptInvitationInput) {
        id
        inviteeEmail
        expiresAt
        createdAt
        updatedAt
        experience {
          id
        }
      }
    }`;

    const variables = {
      acceptInvitationInput: {
        email: this.partnerEmail,
        inviteToken: invitationToken,
        password: this.password,
      },
    };

    const request = {
      query,
      variables,
    };

    const headers = {
      Accept: 'application/json',
      Authorization: `Bearer ${authorisationToken}`,
      'Content-Type': 'application/json',
    };

    await axios.post(apiURL, request, { headers });
  }
}

export default PartnerUtils;

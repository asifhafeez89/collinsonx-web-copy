import { MailinatorClient, GetInboxRequest, GetMessageRequest } from 'mailinator-client';
import axios from 'axios';
import dotenv from 'dotenv'
dotenv.config({ path: `.env.tests` })

class SignUp {
  async receiveRegistrationEmail(email) {

    // TODO: apiURL to be dynamic with the environment being tested
    const apiUrl = `https://gateway-api.${process.env.ENV}.cergea.com/graphql`

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
        userType: "PARTNER",
        experience: {
          id: process.env.EXPERIENCE_ID
        }
      }
    };

    const request = {
      query: mutation,
      variables: variables
    };

    const headers = {
      'x-user-id': process.env.X_USER_ID,
      'x-user-type': 'SUPER_USER'
    }

    const response = await axios.post(apiUrl, request, { headers });

    const createInvitationObj = response.data.data.createInvitation;

    if (createInvitationObj === null) {
      throw new Error("The createInvitation response object is null. The registration email was unable to be sent out. The method of authorisation, or the credentials themselves, may be incorrect.")
    };
  };

  async getRegistrationURL(email) {
    const username = email.split("@")[0];

    const mailinatorClient = new MailinatorClient(
      process.env.MAILINATOR_API_TOKEN
    );


    try {
      let latestMessage;
      let count = 0;

      while (latestMessage === undefined && count < 3) {
        count > 0 && await new Promise(resolve => setTimeout(resolve, 5000));

        const inbox = await mailinatorClient.request(
          new GetInboxRequest(process.env.MAILINATOR_EMAIL_ADDRESS)
        );

        latestMessage = await inbox.result.msgs.find(message => message.to === username);

        count++;
      };

      if (latestMessage === undefined) {
        throw new Error("Could not find the OTP email. Check the user's email is correct in relation to the Mailinator account being used.")
      };

      const id = latestMessage.id;

      const latestMessageContents = await mailinatorClient.request(
        new GetMessageRequest(process.env.MAILINATOR_EMAIL_ADDRESS, username, id)
      );

      const regex = /https.*?(?=\])/;

      const url = regex.exec(latestMessageContents.result.parts[0].body);

      const formattedURL = url[0].toString().replace(/(&#x2F;)/g, "/").replaceAll("&#x3D;", "=");

      return formattedURL;
    } catch (err) {
      throw err
    };


  };
};

module.exports = SignUp;
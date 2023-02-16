import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless'
import Session from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      EmailPassword.init(),
      Session.init(),
    ],
  };
};

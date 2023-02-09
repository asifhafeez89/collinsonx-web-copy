import ThirdPartyPasswordlessReact from 'supertokens-auth-react/recipe/thirdpartypasswordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

import { appInfo } from './appInfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordlessReact.init({
        contactMethod: 'EMAIL_OR_PHONE',
      }),
      Passwordless.init(),
      SessionReact.init(),
    ],
  };
};

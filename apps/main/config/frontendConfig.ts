import PasswordlessReact from 'supertokens-auth-react/recipe/passwordless';
import SessionReact from 'supertokens-auth-react/recipe/session';
import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types';
import Passwordless from 'supertokens-web-js/recipe/passwordless';

import { appInfo } from './appInfo';

export const frontendConfig = (): SuperTokensConfig => {
  return {
    appInfo,
    recipeList: [
      PasswordlessReact.init({
        contactMethod: 'EMAIL_OR_PHONE',
      }),
      Passwordless.init(),
      SessionReact.init(),
    ],
  };
};

import { ThirdPartyPasswordless } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

import Session, { InputType } from 'supertokens-auth-react/recipe/session';

const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      Session.init({ sessionTokenFrontendDomain } as InputType),
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
    ],
  };
};

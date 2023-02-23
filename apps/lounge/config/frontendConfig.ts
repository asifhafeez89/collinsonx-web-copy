import { ThirdPartyPasswordless, Session } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;
console.log(sessionTokenFrontendDomain);

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      Session.init({ sessionTokenFrontendDomain }),
    ],
  };
};

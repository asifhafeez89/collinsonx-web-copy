import { ThirdPartyPasswordless, Session } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

const sessionScope = process.env.NEXT_PUBLIC_SESSION_SCOPE;
console.log(sessionScope);

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      Session.init({ sessionScope }),
    ],
  };
};

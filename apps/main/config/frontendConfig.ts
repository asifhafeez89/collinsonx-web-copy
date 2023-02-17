import ThirdPartyPasswordless from 'supertokens-auth-react/recipe/thirdpartypasswordless'
import Session from 'supertokens-auth-react/recipe/session';
import { appInfo } from './appInfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      Session.init({ sessionScope: '.lifestyle-x.io'}),
    ],
  };
};
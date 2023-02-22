import { ThirdPartyPasswordless, Session } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      Session.init({ sessionScope: '.localhost' }),
    ],
  };
};

import {
  ThirdPartyPasswordless,
  Session,
  InputType,
} from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
      }),
      Session.init({ sessionTokenFrontendDomain } as InputType),
    ],
  };
};

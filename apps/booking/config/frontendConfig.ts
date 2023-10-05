import { ThirdPartyPasswordless } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

import Session, { InputType } from 'supertokens-auth-react/recipe/session';

const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;

async function userContextHandler(context: any) {
  const { userContext = {}, requestInit } = context;
  const body = requestInit.body ? JSON.parse(requestInit.body) : {};

  requestInit.body = JSON.stringify({ ...body, userContext });

  return context;
}

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [
      Session.init({
        isInIframe: true,
        sessionTokenFrontendDomain,
        preAPIHook: userContextHandler,
      } as InputType),
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
        preAPIHook: userContextHandler,
      }),
    ],
  };
};

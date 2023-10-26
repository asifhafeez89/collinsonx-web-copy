import { ThirdPartyPasswordless } from '@collinsonx/utils/supertokens';
import { appInfo } from './appInfo';

import Session, { InputType } from 'supertokens-auth-react/recipe/session';
import getWindowHandler from './windowHandler';
import getCookieHandler from '@collinsonx/utils/lib/cookieHandler';

async function userContextHandler(context: any) {
  const { userContext = {}, requestInit } = context;
  const body = requestInit.body ? JSON.parse(requestInit.body) : {};

  requestInit.body = JSON.stringify({ ...body, userContext });

  return context;
}

export const frontendConfig = () => {
  return {
    appInfo,
    windowHandler: getWindowHandler,
    cookieHandler: getCookieHandler,
    recipeList: [
      Session.init({
        isInIframe: true,
        preAPIHook: userContextHandler,
        tokenTransferMethod: 'header',
      } as InputType),
      ThirdPartyPasswordless.init({
        contactMethod: 'EMAIL',
        preAPIHook: userContextHandler,
      }),
    ],
  };
};

//require('dotenv').config();

import PasswordlessNode from 'supertokens-node/recipe/passwordless';
import SessionNode from 'supertokens-node/recipe/session';
import { appInfo } from './appInfo';

export const backendConfig = () => {
  return {
    framework: 'express' as const,
    supertokens: {
      connectionURI: 'https://try.supertokens.com',
      // connectionURI: "https://authz.lifestyle-x.io",
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
    },
    appInfo,
    recipeList: [
      PasswordlessNode.init({
        flowType: 'USER_INPUT_CODE_AND_MAGIC_LINK',
        contactMethod: 'EMAIL',
      }),
      SessionNode.init(),
    ],
    isInServerlessEnv: true,
  };
};
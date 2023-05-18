import { EmailPassword, SessionRecipe } from '@collinsonx/utils/supertokens';
import Router from 'next/router';
import { appInfo } from './appInfo';

const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [SessionRecipe.init(), EmailPassword.init()],
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};

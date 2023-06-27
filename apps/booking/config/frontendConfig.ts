import Session from 'supertokens-auth-react/recipe/session';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Router from 'next/router';
import { appInfo } from './appInfo';

export const frontendConfig = () => {
  return {
    appInfo,
    recipeList: [Session.init(), EmailPassword.init()],
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

import Session, { InputType } from 'supertokens-auth-react/recipe/session';
import EmailPassword from 'supertokens-auth-react/recipe/emailpassword';
import Router from 'next/router';
import { appInfo } from './appInfo';

export const frontendConfig = () => {
  const sessionTokenFrontendDomain = process.env.NEXT_PUBLIC_SESSION_SCOPE;

  return {
    appInfo,
    recipeList: [
      Session.init({ sessionTokenFrontendDomain } as InputType),
      EmailPassword.init(),
    ],
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

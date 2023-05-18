export {
  default as Session,
  doesSessionExist,
  useSessionContext,
  getUserId,
  SessionAuth,
} from 'supertokens-auth-react/recipe/session';

export type { InputType } from 'supertokens-auth-react/recipe/session';

export {
  default as ThirdPartyPasswordless,
  consumePasswordlessCode,
  createPasswordlessCode,
  signOut,
} from 'supertokens-auth-react/recipe/thirdpartypasswordless';

export {
  default as default,
  SuperTokensWrapper,
  redirectToAuth,
} from 'supertokens-auth-react';

export type {
  SuperTokensConfig,
  AppInfoUserInput,
} from 'supertokens-auth-react/lib/build/types';

export { default as SessionRecipe } from 'supertokens-web-js/recipe/session';
export {
  default as EmailPassword,
  signIn,
  signUp,
  doesEmailExist,
} from 'supertokens-web-js/recipe/emailpassword';

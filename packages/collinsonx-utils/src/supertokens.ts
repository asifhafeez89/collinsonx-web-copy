export {
  default as Session,
  doesSessionExist,
  useSessionContext,
  getUserId,
} from 'supertokens-auth-react/recipe/session';

export type { InputType } from 'supertokens-auth-react/recipe/session';

export {
  default as ThirdPartyPasswordless,
  consumePasswordlessCode,
  createPasswordlessCode,
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

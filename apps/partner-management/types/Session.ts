import { Experience } from '@collinsonx/utils';
import { SessionContextType } from 'supertokens-auth-react/recipe/session';

export type UserType = 'PARTNER' | 'SUPER_USER';

export type AppSession = {
  accessTokenPayload: {
    userType?: UserType;
    experiences?: Experience[];
  };
};

import { AccountProvider } from '@collinsonx/constants/enums';
import { FAQ_PP, FAQ_LK } from '../config/Constants';

export const verifyAccountProvider = (provider: AccountProvider) => {
  if (provider === AccountProvider.PP) {
    return FAQ_PP;
  } else if (provider === AccountProvider.LK) {
    return FAQ_LK;
  } else {
    return FAQ_PP;
  }
};

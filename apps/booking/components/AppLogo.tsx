import { AccountProvider, Client } from '@collinsonx/constants/enums';
import {
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';
import { ReactNode } from 'react';

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;

const logos: Record<AccountProvider | string, ReactNode> = {
  [LK]: <LogoLK width={200} height={100} />,
  [PP]: <LogoPP width={200} height={100} />,
  [Mastercard_HSBC]: <LogoHSBC width={200} height={100} />,
};

interface AppLogoProps {
  accountProvider: AccountProvider;
  membershipType?: string;
}

const AppLogo = ({ accountProvider, membershipType }: AppLogoProps) => {
  if (membershipType && logos[membershipType]) {
    return logos[membershipType];
  } else if (accountProvider) {
    return logos[accountProvider];
  } else {
    return logos[PP];
  }
};

export default AppLogo;

import {
  LogoCergea,
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';
import { ReactNode } from 'react';
import { AccountProvider } from 'types/booking';

const logos: Record<AccountProvider | string, ReactNode> = {
  Cergea: <LogoCergea width={200} height={50} />,
  LK: <LogoLK width={200} height={100} />,
  PP: <LogoPP width={200} height={100} />,
  HSBC: <LogoHSBC width={200} height={100} />,
  Barclays: <></>,
};

interface AppLogoProps {
  accountProvider: AccountProvider;
  membershipType?: string;
}

const AppLogo = ({ accountProvider, membershipType }: AppLogoProps) => {
  if (membershipType && logos[membershipType]) {
    return logos[membershipType];
  } else {
    return logos[accountProvider];
  }
};

export default AppLogo;

import {
  LogoCergea,
  LogoHSBC,
  LogoLoungeKey,
  LogoPriorityPass,
} from '@collinsonx/design-system/assets/logo';
import { ReactNode } from 'react';
import { Brand } from 'types/booking';

const logos: Record<Brand, ReactNode> = {
  CERGEA: <LogoCergea width={200} height={100} />,
  LOUNGE_KEY: <LogoLoungeKey width={200} height={100} />,
  PRIORITY_PASS: <LogoPriorityPass width={200} height={100} />,
  HSBC: <LogoHSBC width={50} height={50} />,
};

interface AppLogoProps {
  brand: Brand;
}

const AppLogo = ({ brand }: AppLogoProps) => logos[brand];

export default AppLogo;

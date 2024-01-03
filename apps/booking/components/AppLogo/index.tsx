import { AccountProvider, Client } from '@collinsonx/constants/enums';
import {
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';
import { Box } from '@collinsonx/design-system/core';
import React, { ReactNode } from 'react';

import classes from './AppLogo.module.css';

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;

interface ShowDesktopInterface {
  children: React.ReactNode;
}

const ShowMobile = ({ children }: ShowDesktopInterface) => {
  return <Box className={classes.showMobile}>{children}</Box>;
};

const ShowDesktop = ({ children }: ShowDesktopInterface) => {
  return <Box className={classes.showDesktop}>{children}</Box>;
};

const size = {
  desktop: {
    width: '28em',
    height: '5em',
  },
  mobile: {
    width: '14em',
    height: '3em',
  },
};

const logos: Record<AccountProvider | string, ReactNode> = {
  [LK]: (
    <Box className={classes.lk}>
      <LogoLK />
    </Box>
  ),

  [PP]: (
    <Box className={classes.pp}>
      <LogoPP />
    </Box>
  ),
  [Mastercard_HSBC]: (
    <Box className={classes.mastercardHsbc}>
      <LogoHSBC />
    </Box>
  ),
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

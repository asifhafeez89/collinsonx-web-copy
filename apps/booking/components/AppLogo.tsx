import { AccountProvider, Client } from '@collinsonx/constants/enums';
import {
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';
import { Box, MediaQuery } from '@mantine/core';
import React, { ReactNode } from 'react';

const { LK, PP } = AccountProvider;
const { Mastercard_HSBC } = Client;

interface ShowDesktopInterface {
  children: React.ReactNode;
}

const ShowMobile = ({ children }: ShowDesktopInterface) => {
  return (
    <Box
      sx={{
        '@media (min-width: 768px)': {
          display: 'none',
        },

        '@media (max-width: 767px)': {
          display: 'block',
        },
      }}
    >
      {children}
    </Box>
  );
};

const ShowDesktop = ({ children }: ShowDesktopInterface) => {
  return (
    <Box
      sx={{
        '@media (max-width: 768px)': {
          display: 'none',
        },

        '@media (min-width: 767px)': {
          display: 'block',
        },
      }}
    >
      {children}
    </Box>
  );
};

const logos: Record<AccountProvider | string, ReactNode> = {
  [LK]: (
    <>
      <ShowDesktop>
        <LogoLK width="28em" height="8em" />
      </ShowDesktop>
      <ShowMobile>
        <LogoLK width="14em" height="4em" />
      </ShowMobile>
    </>
  ),

  [PP]: (
    <>
      <ShowDesktop>
        <LogoPP width="28em" height="8em" />
      </ShowDesktop>
      <ShowMobile>
        <LogoPP width={'14em'} height="4em" />
      </ShowMobile>
    </>
  ),
  [Mastercard_HSBC]: (
    <>
      <ShowDesktop>
        <LogoHSBC width="28em" height="8em" />
      </ShowDesktop>
      <ShowMobile>
        <LogoHSBC width="14em" height="4em" />
      </ShowMobile>
    </>
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

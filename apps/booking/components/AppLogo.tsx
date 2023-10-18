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
    <>
      <ShowDesktop>
        <LogoLK width={size.desktop.width} height={size.desktop.height} />
      </ShowDesktop>
      <ShowMobile>
        <LogoLK height={size.mobile.height} />
      </ShowMobile>
    </>
  ),

  [PP]: (
    <>
      <ShowDesktop>
        <LogoPP width={size.desktop.width} height={size.desktop.height} />
      </ShowDesktop>
      <ShowMobile>
        <LogoPP height={size.mobile.height} />
      </ShowMobile>
    </>
  ),
  [Mastercard_HSBC]: (
    <>
      <ShowDesktop>
        <LogoHSBC width={size.desktop.width} height={size.desktop.height} />
      </ShowDesktop>
      <ShowMobile>
        <LogoHSBC height={size.mobile.height} />
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

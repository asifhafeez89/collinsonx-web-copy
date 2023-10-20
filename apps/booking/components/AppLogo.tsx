import { AccountProvider, Client } from '@collinsonx/constants/enums';
import {
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';
import { Box } from '@mantine/core';
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
    <Box
      sx={{
        transform: 'scale(0.35)',
        '@media (max-width: 768px)': {
          transform: 'scale(0.17)',
        },
      }}
    >
      <LogoLK />
    </Box>
  ),

  [PP]: (
    <Box
      sx={{
        transform: 'scale(0.36)',
        '@media (max-width: 768px)': {
          transform: 'scale(0.18)',
        },
      }}
    >
      <LogoPP />
    </Box>
  ),
  [Mastercard_HSBC]: (
    <Box
      sx={{
        marginTop: '10px',
        transform: 'scale(0.70)',
        '@media (max-width: 768px)': {
          transform: 'scale(0.45)',
        },
      }}
    >
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

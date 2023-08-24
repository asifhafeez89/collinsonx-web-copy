import {
  Box,
  Center,
  Container,
  Divider,
  Stack,
} from '@collinsonx/design-system/core';
import React, { ReactNode } from 'react';
import { getThemeKey } from '@lib';

import {
  LogoCergea,
  LogoAmex,
  LogoDinersClubWhite,
} from '@collinsonx/design-system/assets/logo';

interface LayoutProps {
  children: ReactNode;
}

const logos = {
  experienceX: LogoCergea,
  amexBlack: LogoAmex,
  amexPlatinum: LogoAmex,
  dinersClub: LogoDinersClubWhite,
};

const themeKey = getThemeKey();

const Logo = logos[themeKey as keyof typeof logos] ?? LogoCergea;

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <Container
      pt={10}
      px={0}
      sx={{
        maxWidth: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#F3F2F3',
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #cccc',
          width: '100%',
        }}
      >
        <Center pb={8} pt={8} mt={-10} sx={{ backgroundColor: '#ffffff' }}>
          <Logo />
        </Center>
      </Box>
      <Box pt={10} sx={{ margin: '0 auto' }}>
        {children}
      </Box>
    </Container>
  );
}

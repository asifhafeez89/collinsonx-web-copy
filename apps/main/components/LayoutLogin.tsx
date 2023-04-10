import { Center, Container, Stack } from '@collinsonx/design-system/core';
import React, { ReactNode } from 'react';
import { getThemeKey } from '@lib';

import {
  LogoExperienceX,
  LogoAmex,
  LogoDinersClubWhite,
} from '@collinsonx/design-system/assets/logo';

interface LayoutProps {
  children: ReactNode;
}

const logos = {
  experienceX: LogoExperienceX,
  amexBlack: LogoAmex,
  amexPlatinum: LogoAmex,
  dinersClub: LogoDinersClubWhite,
};

const themeKey = getThemeKey();

const Logo = logos[themeKey as keyof typeof logos] ?? LogoExperienceX;

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <Container
      pt={40}
      px={16}
      sx={{
        maxWidth: '375px',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#112132',
      }}
    >
      <Stack spacing={40} sx={{ height: '100%' }}>
        <Center pt={8}>
          <Logo />{' '}
        </Center>
        {children}
      </Stack>
    </Container>
  );
}

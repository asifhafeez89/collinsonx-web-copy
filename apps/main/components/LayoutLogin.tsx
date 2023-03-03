import { Center, Container, Stack } from '@mantine/core';
import React from 'react';
import { getThemeKey } from '../lib/index';

import {
  LogoExperienceX,
  LogoAmex,
  LogoDinersClubWhite,
} from '@collinsonx/design-system/assets/logo';

interface LayoutProps {
  children: JSX.Element;
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
      }}
    >
      <Stack spacing={24} sx={{ height: '100%' }}>
        <Center>
          <Logo />{' '}
        </Center>
        {children}
      </Stack>
    </Container>
  );
}

import {
  Box,
  Center,
  Container,
  Divider,
  Stack,
} from '@collinsonx/design-system/core';
import React, { ReactNode } from 'react';
import { getThemeKey } from '@lib';

import { LogoCergea, LogoHSBC } from '@collinsonx/design-system/assets/logo';
import router, { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

const logos = {
  experienceX: LogoCergea,
  hsbc: LogoHSBC,
};

export default function LayoutLogin({ children }: LayoutProps) {
  const router = useRouter();

  const { partner } = router?.query;

  const Logo = logos[partner as keyof typeof logos] ?? LogoCergea;

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

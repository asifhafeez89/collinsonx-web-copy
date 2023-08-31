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
import usePayload from 'hooks/payload';
import { Brand } from 'types/booking';

interface LayoutProps {
  children: ReactNode;
}

const logos: Record<Brand, ReactNode> = {
  CERGEA: <LogoCergea width={100} height={100} />,
  LOUNGE_KEY: <></>,
  PRIORITY_PASS: <></>,
  HSBC: <LogoHSBC width={50} height={50} />,
};

export default function LayoutLogin({ children }: LayoutProps) {
  const router = useRouter();
  const themeKey = getThemeKey();

  const { payload, setPayload } = usePayload();

  const logo =
    logos[payload?.brand_affiliation as keyof typeof logos] ?? LogoCergea;

  return (
    <Container
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
        <Center pb={8} pt={8} sx={{ backgroundColor: '#ffffff' }}>
          {logo}
        </Center>
      </Box>
      <Box pt={10} sx={{ margin: '0 auto' }}>
        {children}
      </Box>
    </Container>
  );
}

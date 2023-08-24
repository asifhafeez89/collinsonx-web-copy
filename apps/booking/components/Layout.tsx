import {
  Center,
  Container,
  Divider,
  MantineProvider,
} from '@collinsonx/design-system/core';
import { Header, experienceX } from '@collinsonx/design-system';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import useAuth from '@collinsonx/utils/hooks/useAuth';

import { getThemeKey } from '@lib';

import {
  LogoCergea,
  LogoAmex,
  LogoDinersClubWhite,
} from '@collinsonx/design-system/assets/logo';

import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, userId, logout] = useAuth({});

  const logos = {
    experienceX: LogoCergea,
    amexBlack: LogoAmex,
    amexPlatinum: LogoAmex,
    dinersClub: LogoDinersClubWhite,
  };

  const handleLogout = async () => {
    localStorage.removeItem('EXPERIENCE_X_CONSUMER_ID');
    if (typeof logout === 'function') {
      await logout();
      // https://github.com/vercel/next.js/issues/40481
      window.location.href = '/';
    }
  };
  const themeKey = getThemeKey();
  const Logo = logos[themeKey as keyof typeof logos] ?? LogoCergea;

  return (
    <Container
      pt={40}
      px={16}
      sx={{
        maxWidth: '375px',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      <Center pt={8}>
        <Logo />
        <Divider my="sm" />
      </Center>
      {children}
    </Container>
  );
}

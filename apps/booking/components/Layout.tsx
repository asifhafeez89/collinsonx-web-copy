import {
  Box,
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

import { LogoCergea, LogoHSBC } from '@collinsonx/design-system/assets/logo';

import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Brand } from 'types/booking';

interface LayoutProps {
  children: ReactNode;
  brand: Brand;
}

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export default function Layout({ children, brand }: LayoutProps) {
  const [isLoggedIn, userId, logout] = useAuth({});

  const logos = {
    CERGEA: <LogoCergea width={100} height={100} />,
    HSBC: <LogoHSBC width={50} height={50} />,
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
  const router = useRouter();

  const logo = logos[brand as keyof typeof logos] ?? logos['CERGEA'];

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
        <Center pb={8} pt={8} sx={{ backgroundColor: '#ffffff' }}>
          {logo}
        </Center>
      </Box>
      <Box p={20}>{children}</Box>
    </Container>
  );
}

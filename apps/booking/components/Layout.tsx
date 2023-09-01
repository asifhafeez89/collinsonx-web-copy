import {
  Box,
  Center,
  Container,
  Divider,
  MantineProvider,
  Image,
} from '@collinsonx/design-system/core';
import { Header, experienceX } from '@collinsonx/design-system';
import { Be_Vietnam_Pro } from 'next/font/google';
import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import useAuth from '@collinsonx/utils/hooks/useAuth';

import { getThemeKey } from '@lib';

import {
  LogoCergea,
  LogoHSBC,
  LogoLK,
  LogoPP,
} from '@collinsonx/design-system/assets/logo';

import { ReactNode } from 'react';
import { useRouter } from 'next/router';

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
    hsbc: LogoHSBC,
    loungeKey: LogoLK,
    priorityPass: LogoPP,
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
  const { partner } = router.query;

  const Logo = logos[partner as keyof typeof logos] ?? LogoCergea;
  console.log(Logo);

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
          <Logo width={200} height={100} />
        </Center>
      </Box>
      {children}
    </Container>
  );
}

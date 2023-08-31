import { Box, Center, Container } from '@collinsonx/design-system/core';
import { Be_Vietnam_Pro } from 'next/font/google';
import useAuth from '@collinsonx/utils/hooks/useAuth';

import { LogoCergea, LogoHSBC } from '@collinsonx/design-system/assets/logo';

import { ReactNode } from 'react';
import usePayload from 'hooks/payload';

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
  const { payload, setPayload } = usePayload();

  const logos = {
    CERGEA: <LogoCergea width={100} height={100} />,
    LOUNGE_KEY: <></>,
    PRIORITY_PASS: <></>,
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

  const logo =
    logos[payload?.brand_affiliation as keyof typeof logos] ?? logos['CERGEA'];

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
      <Box p={20}>{children}</Box>
    </Container>
  );
}

import { Box, Center, Container } from '@collinsonx/design-system/core';
import useAuth from '@collinsonx/utils/hooks/useAuth';

import { ReactNode } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, userId, logout] = useAuth({});
  const { payload, setPayload } = usePayload();

  const handleLogout = async () => {
    localStorage.removeItem('EXPERIENCE_X_CONSUMER_ID');
    if (typeof logout === 'function') {
      await logout();
      // https://github.com/vercel/next.js/issues/40481
      window.location.href = '/';
    }
  };

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
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Center>
      </Box>
      <Box p={20}>{children}</Box>
    </Container>
  );
}

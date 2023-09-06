import { Box, Center, Container, Text } from '@collinsonx/design-system/core';
import useAuth from '@collinsonx/utils/hooks/useAuth';

import { ReactNode } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import { Button } from '@collinsonx/design-system';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutError({ children }: LayoutProps) {
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
      <Center
        style={{
          display: 'flex',
          height: '70%',
          alignItems: 'center',
        }}
      >
        <Box p={20} style={{ backgroundColor: '#fff' }}>
          <Text align="center" size={20} fw={700}>
            {children}
          </Text>
          <Text align="center" mb={18}>
            That might be an error in the system. Please try again or browse
            other options
          </Text>

          <Center>
            <Button>{`Return to lounges`.toUpperCase()}</Button>
          </Center>
        </Box>
      </Center>
    </Container>
  );
}

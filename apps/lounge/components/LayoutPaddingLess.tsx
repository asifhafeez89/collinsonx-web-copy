import { Box } from '@collinsonx/design-system/core';
import { Header } from '@collinsonx/design-system';
import { LogoCergea } from '@collinsonx/design-system/assets/logo';

import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import useAuth from '@collinsonx/utils/hooks/useAuth';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  maw?: number;
}

export default function LayoutPaddingLess({ children, maw }: LayoutProps) {
  const [isLoggedIn, userId, logout] = useAuth({});

  const handleLogout = async () => {
    localStorage.removeItem('EXPERIENCE_X_CONSUMER_ID');
    if (typeof logout === 'function') {
      await logout();
      // https://github.com/vercel/next.js/issues/40481
      window.location.href = '/';
    }
  };
  return (
    <Box maw={maw} m="auto">
      <Header
        onClickSignout={handleLogout}
        logo={<LogoCergea />}
        items={[
          {
            label: 'Home',
            link: '/',
            icon: <Home color="#112132" />,
          },
          {
            label: 'My trips',
            link: '/bookings',
            icon: <Cart color="#112132" />,
          },
          {
            label: 'AI Travel companion',
            link: '/companion',
            icon: <Chat color="#112132" />,
          },
        ]}
      />
      <Box
        sx={{
          maxWidth: '100%',
          height: 'calc(100% - 69px)',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

import {
  Box,
  Container,
  MantineProvider,
} from '@collinsonx/design-system/core';
import { Header, experienceX } from '@collinsonx/design-system';
import { Be_Vietnam_Pro } from 'next/font/google';
import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';

import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import useAuth from '@collinsonx/utils/hooks/useAuth';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutPaddingLess({ children }: LayoutProps) {
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
    <>
      <Header
        onClickSignout={handleLogout}
        logo={<LogoExperienceX />}
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
    </>
  );
}

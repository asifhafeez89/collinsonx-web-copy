import { Container, MantineProvider } from '@collinsonx/design-system/core';
import { Header, experienceX } from '@collinsonx/design-system';
import { Be_Vietnam_Pro } from '@next/font/google';
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

export default function Layout({ children }: LayoutProps) {
  const [isLoggedIn, userId, logout] = useAuth({});

  const handleLogout = async () => {
    if (typeof logout === 'function') {
      console.log('---- Logout await');
      await logout();
      console.log('---- Logout redirect');
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
            link: '/lounge',
            icon: <Home color="#112132" />,
          },
          {
            label: 'My trips',
            link: '/lounge/bookings',
            icon: <Cart color="#112132" />,
          },
          {
            label: 'AI Travel companion',
            link: '/companion',
            icon: <Chat color="#112132" />,
          },
        ]}
      />
      <Container
        p={16}
        sx={{
          maxWidth: '375px',
          height: '100%',
        }}
      >
        {children}
      </Container>
    </>
  );
}

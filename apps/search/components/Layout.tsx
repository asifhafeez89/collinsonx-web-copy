import { Header } from '@collinsonx/design-system';
import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import { Container } from '@collinsonx/design-system/core';
import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import useAuth from '@collinsonx/utils/hooks/useAuth';

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
        }}
      >
        {children}
      </Container>
    </>
  );
}

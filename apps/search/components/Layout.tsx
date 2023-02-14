import { Header } from '@collinsonx/design-system';
import { Cart, Chat, Home } from '@collinsonx/design-system/assets/icons';
import { Container } from '@collinsonx/design-system/core';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header
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

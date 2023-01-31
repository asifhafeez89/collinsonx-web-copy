import { Container } from '@collinson/design-system/core';

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      p={16}
      sx={{
        maxWidth: '375px',
      }}
    >
      {children}
    </Container>
  );
}

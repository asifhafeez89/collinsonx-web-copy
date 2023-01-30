import { Container } from '@mantine/core';
import { Header } from '@collinson/design-system/index';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container px={0}>
      <Header />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;

import { Container } from '@mantine/core';
import Header from './header';
import { LogoCergea } from '../assets/logo';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      px={0}
      style={{
        maxWidth: '375px',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Header logo={<LogoCergea />} />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;

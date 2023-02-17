import { Container } from '@collinsonx/utils/core';
import Header from './header';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container
      px={0}
      sx={{
        maxWidth: '375px',
        height: '100%',
        backgroundColor: '#ffffff',
      }}
    >
      <Header />
      <main>{children}</main>
    </Container>
  );
};

export default Layout;

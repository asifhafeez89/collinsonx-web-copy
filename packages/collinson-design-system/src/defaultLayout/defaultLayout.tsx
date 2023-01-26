import { Container } from '@mantine/core';
interface LayoutProps {
  children: JSX.Element;
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Container mt={60} sx={{ maxWidth: '375px' }}>
      {children}
    </Container>
  );
};

export default Layout;
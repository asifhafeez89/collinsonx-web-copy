import { Container, MantineProvider } from '@collinsonx/design-system/core';
import { Header, themeLight } from '@collinsonx/design-system';
import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  style: ['normal'],
  subsets: ['latin'],
});

interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Container
      p={16}
      sx={{
        maxWidth: '375px',
        height: '100%',
      }}
    >
      {children}
    </Container>
  );
}

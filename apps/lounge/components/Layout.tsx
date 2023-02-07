import { Container, MantineProvider } from '@collinsonx/design-system/core';
import { Header, themeLight } from '@collinsonx/design-system';
import { Be_Vietnam_Pro } from '@next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
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

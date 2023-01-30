import { Container, MantineProvider } from '@mantine/core';

import { Header, themeLight } from '@collinson/design-system';

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
    <MantineProvider
      theme={themeLight({ fontFamily: openSans.style.fontFamily })}
      withGlobalStyles
      withNormalizeCSS
    >
      <Header />
      <Container
        p={16}
        sx={{
          maxWidth: '375px',
        }}
      >
        {children}
      </Container>
    </MantineProvider>
  );
}

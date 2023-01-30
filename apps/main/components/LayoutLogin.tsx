import { Center, Container, MantineProvider, Stack } from '@mantine/core';
import { Logo } from '@collinson/design-system/assets/logo';

import { themeDark } from '@collinson/design-system';

import { Open_Sans } from '@next/font/google';

const openSans = Open_Sans({
  style: ['normal'],
  subsets: ['latin'],
});

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <MantineProvider
      theme={themeDark({ fontFamily: openSans.style.fontFamily })}
      withGlobalStyles
      withNormalizeCSS
    >
      <Container
        pt={40}
        sx={{
          maxWidth: '375px',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Stack spacing={24} sx={{ height: '100%' }}>
          <Center>
            <Logo />
          </Center>
          {children}
        </Stack>
      </Container>
    </MantineProvider>
  );
}

import { Center, Container, Stack } from '@collinsonx/design-system/core';
import { Logo } from '@collinsonx/design-system/assets/logo';
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
  );
}

import { withTheme } from '@emotion/react';
import { Center, Container, Stack } from '@mantine/core';

import Logo from '../assets/logo.svg';

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
          overflow: 'hidden'
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

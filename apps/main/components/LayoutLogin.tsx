import { Center, Container, Stack } from '@mantine/core';

import Logo from '../assets/logo.svg';

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <Container mt={40} sx={{ maxWidth: '375px' }}>
      <Stack spacing={24}>
        <Center>
          <Logo />
        </Center>
        {children}
      </Stack>
    </Container>
  );
}

import { Container, Stack } from '@mantine/core';

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
        {children}
      </Stack>
    </Container>
  );
}

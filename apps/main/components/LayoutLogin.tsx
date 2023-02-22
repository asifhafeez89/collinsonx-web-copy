import { Center, Container, Stack } from '@collinsonx/design-system/core';
import { LogoExperienceX } from '@collinsonx/design-system/assets/logo';
import { Be_Vietnam_Pro } from '@next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  style: ['normal'],
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

interface LayoutProps {
  children: JSX.Element;
}

export default function LayoutLogin({ children }: LayoutProps) {
  return (
    <Container
      pt={40}
      px={16}
      sx={{
        maxWidth: '375px',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack spacing={24} sx={{ height: '100%' }}>
        <Center>
          <LogoExperienceX />
        </Center>
        {children}
      </Stack>
    </Container>
  );
}

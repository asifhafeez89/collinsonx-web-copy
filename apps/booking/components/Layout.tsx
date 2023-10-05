import { Box, Center, Container } from '@collinsonx/design-system/core';

import { ReactNode } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { payload, setPayload } = usePayload();

  return (
    <Container
      px={0}
      sx={{
        maxWidth: '100%',
        backgroundColor: colors.background,
        height: '100%',

        '@media (max-width: 768px)': {
          margin: '0',
          padding: '0',
        },
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: colors.white,
        }}
      >
        <Center pb={8} pt={8}>
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Center>
      </Box>
      <Box sx={{ paddingBottom: '1.3rem' }}>{children}</Box>
    </Container>
  );
}

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
      style={{
        maxWidth: '100%',
        backgroundColor: colors.background,
        height: '100%',
        overflow: 'scroll',
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #cccc',
          width: '100%',
        }}
      >
        <Center pb={8} pt={8} sx={{ backgroundColor: colors.white }}>
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Center>
      </Box>
      <Box>{children}</Box>
    </Container>
  );
}

import { Box, Center, Container } from '@collinsonx/design-system/core';
import React, { ReactNode } from 'react';

import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutLogin({ children }: LayoutProps) {
  const { payload, setPayload } = usePayload();

  return (
    <Container
      px={0}
      sx={{
        maxWidth: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: '#F3F2F3',
      }}
    >
      <Box
        sx={{
          borderBottom: '1px solid #cccc',
          width: '100%',
        }}
      >
        <Center pb={8} pt={8} sx={{ backgroundColor: '#ffffff' }}>
          <AppLogo brand={payload?.brand_affiliation!} />
        </Center>
      </Box>
      <Box pt={10} sx={{ margin: '0 auto' }}>
        {children}
      </Box>
    </Container>
  );
}

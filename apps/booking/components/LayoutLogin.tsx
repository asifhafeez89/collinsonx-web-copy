import { Box, Center, Container, ScrollArea } from '@collinsonx/design-system/core';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import React, { ReactNode } from 'react';

import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutLogin({ children }: LayoutProps) {
  const { payload, setPayload } = usePayload();
  const { height } = useViewportSize();

  return (
    <ScrollArea type='never'>
      <Container
        px={0}
        sx={{
          maxWidth: '100%',
          minHeight: `${height}px`,
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
            {payload && (
              <AppLogo
                accountProvider={payload.accountProvider}
                membershipType={payload.membershipType}
              />
            )}
          </Center>
        </Box>
        <Box pt={10} sx={{ margin: '0 auto' }}>
          {children}
        </Box>
      </Container>
    </ScrollArea>
  );
}

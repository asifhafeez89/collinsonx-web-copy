import {
  Box,
  Center,
  Container,
  ScrollArea,
} from '@collinsonx/design-system/core';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import React, { ReactNode } from 'react';

import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutLogin({ children }: LayoutProps) {
  const { payload, setPayload } = usePayload();
  const { height } = useViewportSize();

  return (
    <ScrollArea type="never">
      <Container
        px={0}
        sx={{
          maxWidth: '100%',
          minHeight: `${height}px`,
          overflow: 'hidden',
          backgroundColor: colors.background,
        }}
      >
        <Box
          sx={{
            borderBottom: `1px solid ${colors.boxBorder}`,
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
        <Box pt={10}>{children}</Box>
      </Container>
    </ScrollArea>
  );
}

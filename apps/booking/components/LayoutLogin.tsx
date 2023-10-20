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
        <div
          style={{
            borderBottom: `1px solid ${colors.boxBorder}`,
            width: '100%',
            position: 'fixed',
            zIndex: 200,
          }}
        >
          {payload && (
            <Box
              mb={2}
              mt={2}
              sx={{
                width: '100%',
                backgroundColor: colors.white,
                boxShadow: `4px 4px 4px 4px ${colors.shadow}`,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                height: '100px',
                '@media (max-width: 768px)': {
                  height: '50px',
                },
                zIndex: 200,
              }}
            >
              <AppLogo
                accountProvider={payload.accountProvider}
                membershipType={payload.membershipType}
              />
            </Box>
          )}
        </div>
        <Box
          sx={{
            paddingBottom: '1.3rem',
            marginTop: '6.5rem',
            '@media (max-width: 768px)': {
              marginTop: '3.3rem',
              padding: '0',
            },
          }}
        >
          {children}
        </Box>
      </Container>
    </ScrollArea>
  );
}

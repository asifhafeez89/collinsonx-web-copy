import { Box, Container, ScrollArea } from '@collinsonx/design-system/core';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import React, { ReactNode } from 'react';

import usePayload from 'hooks/payload';
import AppLogo from '../AppLogo';

import classes from './LayoutLogin.module.css';

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
        fluid
        className={classes.container}
        style={{
          minHeight: `${height}px`,
        }}
      >
        <div className={classes.container2}>
          {payload && (
            <Box className={classes.container3}>
              <Box mb={2} mt={2} className={classes.logoWrapper}>
                <AppLogo
                  accountProvider={payload.accountProvider}
                  membershipType={payload.membershipType}
                />
              </Box>
            </Box>
          )}
        </div>
        <Box className={classes.contentWrapper}>{children}</Box>
      </Container>
    </ScrollArea>
  );
}

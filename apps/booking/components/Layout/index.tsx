import { Box, Center, Container } from '@collinsonx/design-system/core';

import { ReactNode, Ref, forwardRef } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from '../AppLogo';

import classes from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}
type ContainerRef = Ref<HTMLDivElement> | undefined;

const Layout = forwardRef(({ children }: LayoutProps, ref: ContainerRef) => {
  const { payload, setPayload } = usePayload();

  return (
    <Container px={0} fluid className={classes.container} ref={ref}>
      <Box className={classes.containerL2}>
        <Box mb={2} mt={2} className={classes.logoWrapper}>
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Box>
      </Box>
      <Box className={classes.contentWrapper}>{children}</Box>
    </Container>
  );
});

export default Layout;

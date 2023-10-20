import { Box, Center, Container } from '@collinsonx/design-system/core';

import { ReactNode, Ref, forwardRef } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';

interface LayoutProps {
  children: ReactNode;
}
type ContainerRef = Ref<HTMLDivElement> | undefined;

const Layout = forwardRef(({ children }: LayoutProps, ref: ContainerRef) => {
  const { payload, setPayload } = usePayload();

  return (
    <Container
      px={0}
      sx={{
        maxWidth: '100%',
        height: '100%',

        '@media (max-width: 768px)': {
          margin: '0',
          padding: '0',
        },
        overflow: 'scroll',
      }}
      ref={ref}
    >
      <Box
        sx={{
          width: '100%',
          backgroundColor: colors.white,
          boxShadow: `4px 4px 4px 0px ${colors.shadow}`,
          position: 'fixed',
          zIndex: 200,
        }}
      >
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
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={{
          paddingBottom: '1.3rem',
          marginTop: '6.4rem',

          '@media (max-width: 768px)': {
            marginTop: '3.rem',
            padding: '0 0 1.3rem 0',
          },
        }}
      >
        {children}
      </Box>
    </Container>
  );
});

export default Layout;

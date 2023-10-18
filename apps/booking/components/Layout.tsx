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
        <Center pb={8} pt={8}>
          {payload && (
            <AppLogo
              accountProvider={payload.accountProvider}
              membershipType={payload.membershipType}
            />
          )}
        </Center>
      </Box>
      <Box
        sx={{
          paddingBottom: '1.3rem',
          marginTop: '10rem',
          '@media (max-width: 768px)': {
            marginTop: '6rem',
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

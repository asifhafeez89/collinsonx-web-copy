import {
  Anchor,
  Box,
  Center,
  Container,
  Text,
  Button,
} from '@collinsonx/design-system/core';

import { ReactNode } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';
import { useRouter } from 'next/router';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutError({ children }: LayoutProps) {
  const { payload, setPayload } = usePayload();
  const router = useRouter();

  return (
    <Container
      px={0}
      sx={{
        maxWidth: '100%',
        height: '100%',
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
      <Center
        style={{
          display: 'flex',
          height: '70%',
          alignItems: 'center',
        }}
      >
        <Box p={20} style={{ backgroundColor: colors.white }}>
          <Text align="center" size={20} fw={700}>
            {children}
          </Text>
          <Text align="center" mb={18}>
            That might be an error in the system. Please try again or browse
            other options
          </Text>

          <Center>
            <Anchor href="#">
              <Button>{`Return to lounges`.toUpperCase()}</Button>{' '}
            </Anchor>
          </Center>
        </Box>
      </Center>
    </Container>
  );
}

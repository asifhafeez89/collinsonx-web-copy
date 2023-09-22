import {
  Anchor,
  Box,
  Center,
  Container,
  Text,
  Button,
} from '@collinsonx/design-system/core';

import { ReactNode, useCallback } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';
import { useRouter } from 'next/router';
import { MOBILE_ACTION_BACK } from '../constants';
import { sendMobileEvent } from '@lib';

interface LayoutProps {
  children: ReactNode;
}

export default function LayoutError({ children }: LayoutProps) {
  const router = useRouter();

  const { payload, referrerUrl } = usePayload();

  const handleClickBack = useCallback(() => {
    if (window) {
      if (referrerUrl) {
        window.location.href = referrerUrl;
      } else {
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    }
  }, [referrerUrl]);

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
              <Button onClick={handleClickBack}>
                {`Return to lounge`.toUpperCase()}
              </Button>
            </Anchor>
          </Center>
        </Box>
      </Center>
    </Container>
  );
}

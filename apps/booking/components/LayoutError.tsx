import {
  Anchor,
  Box,
  Center,
  Container,
  Text,
  Button,
} from '@collinsonx/design-system/core';
import { useCallback } from 'react';
import usePayload from 'hooks/payload';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';
import { MOBILE_ACTION_BACK } from '../constants';
import { sendMobileEvent } from '@lib';

interface LayoutProps {
  payloadErrorTitle?: string;
  payloadErrorMessage?: string;
}

const defaultErrTitle = '';
const defaultErrMessage =
  'There might be an error in the system. Please try again or browse other options';

export default function LayoutError(props: LayoutProps) {
  let { payloadErrorMessage, payloadErrorTitle } = props;
  const { payload, referrerUrl } = usePayload();

  if (!payloadErrorMessage) payloadErrorMessage = defaultErrMessage;
  if (!payloadErrorTitle) payloadErrorTitle = defaultErrTitle;

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
        <Box
          p={20}
          style={{
            backgroundColor: colors.white,
            maxWidth: '440px',
          }}
          sx={{
            '@media (max-width: 768px)': {
              width: '90%',
            },
          }}
        >
          <Text align="center" size={20} fw={700}>
            {payloadErrorTitle}
          </Text>
          <Text align="center" mb={18}>
            {payloadErrorMessage}
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

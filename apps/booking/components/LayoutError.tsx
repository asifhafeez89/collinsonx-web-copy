import {
  Anchor,
  Box,
  Center,
  Container,
  Flex,
  Text,
} from '@collinsonx/design-system/core';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';
import { AccountProvider, Client } from '@collinsonx/constants/enums';
import BackButton from './BackButton';
import UpdateEnvError, { devices } from './UpdateEnvError';

interface LayoutProps {
  payloadErrorTitle?: string;
  payloadErrorMessage?: string;
  payloadPlatform: String;
  payloadTheme: {
    accountProvider: AccountProvider;
    membershipType: Client;
  };
}

const defaultErrTitle = '';
const defaultErrMessage =
  'There might be an error in the system. Please try again or browse other options';

export default function LayoutError(props: LayoutProps) {
  let {
    payloadErrorMessage,
    payloadErrorTitle,
    payloadTheme,
    payloadPlatform,
  } = props;

  if (!payloadErrorMessage) payloadErrorMessage = defaultErrMessage;
  if (!payloadErrorTitle) payloadErrorTitle = defaultErrTitle;

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
          accountProvider={payloadTheme.accountProvider}
          membershipType={payloadTheme.membershipType}
        />
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
            position: 'fixed',
            zIndex: 200,
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
          <Box pt={10} pb={10}>
            <Flex
              direction="column"
              sx={{ justifyItems: 'center', alignItems: 'center' }}
            >
              {' '}
              <UpdateEnvError type={payloadPlatform as devices} />
              {(payloadPlatform === 'ios' || payloadPlatform === 'android') && (
                <Text mb={3} mt={3}>
                  Try again or browse other options.
                </Text>
              )}
            </Flex>
          </Box>
          {/* )} */}
          <Center>
            <Anchor href="#">
              <BackButton>{`Return to lounge`.toUpperCase()}</BackButton>
            </Anchor>
          </Center>
        </Box>
      </Center>
    </Container>
  );
}

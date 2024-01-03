import {
  Anchor,
  Box,
  Center,
  Container,
  Flex,
  Text,
} from '@collinsonx/design-system/core';
import AppLogo from '../AppLogo';
import colors from 'ui/colour-constants';
import { AccountProvider, Client } from '@collinsonx/constants/enums';
import BackButton from '../BackButton';
import UpdateEnvError, { devices } from '../UpdateEnvError';

import classes from './LayoutError.module.css';

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
    <Container px={0} fluid className={classes.container}>
      <Box mb={2} mt={2} className={classes.logoWrapper}>
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
        <Box p={20} className={classes.containerContent}>
          <Text className={classes.center} size="xl" fw={700}>
            {payloadErrorTitle}
          </Text>
          <Text className={classes.center} mb={18}>
            {payloadErrorMessage}
          </Text>
          <Box pt={10} pb={10}>
            <Flex direction="column" className={classes.errorContainer}>
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

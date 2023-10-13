import {
  Anchor,
  Box,
  Center,
  Container,
  Text,
} from '@collinsonx/design-system/core';
import AppLogo from './AppLogo';
import colors from 'ui/colour-constants';
import { AccountProvider, Client } from '@collinsonx/constants/enums';
import BackButton from './BackButton';

interface LayoutProps {
  payloadErrorTitle?: string;
  payloadErrorMessage?: string;
  payloadTheme: {
    accountProvider: AccountProvider;
    membershipType: Client;
  };
}

const defaultErrTitle = '';
const defaultErrMessage =
  'There might be an error in the system. Please try again or browse other options';

export default function LayoutError(props: LayoutProps) {
  let { payloadErrorMessage, payloadErrorTitle, payloadTheme } = props;

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
        sx={{
          borderBottom: `1px solid ${colors.boxBorder}`,
          width: '100%',
        }}
      >
        <Center pb={8} pt={8} sx={{ backgroundColor: colors.white }}>
          <AppLogo
            accountProvider={payloadTheme.accountProvider}
            membershipType={payloadTheme.membershipType}
          />
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
              <BackButton>{`Return to lounge`.toUpperCase()}</BackButton>
            </Anchor>
          </Center>
        </Box>
      </Center>
    </Container>
  );
}

import {
  Container,
  Stack,
  Text,
  Button,
  Anchor,
  Center,
} from '@collinsonx/design-system/core';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import { useRouter } from 'next/router';
import { BridgePayload } from 'types/booking';
import colors from 'ui/colour-constants';

const PinLockout = ({ payload }: { payload: BridgePayload | undefined }) => {
  const router = useRouter();
  const { height } = useViewportSize();

  const handleClickReenter = () => {
    router.push({
      pathname: '/auth/login',
    });
  };

  const handleSupportClick = () => {
    let url: string = '';

    if (
      payload?.membershipType === 'HSBC' ||
      payload?.accountProvider === 'PP'
    ) {
      url = 'https://memberhelp.prioritypass.com/en/support/home';
    } else if (payload?.accountProvider === 'LK') {
      url = 'https://www.loungekey.com/en/contact-us';
    }

    router.replace(url);
  };

  return (
    <Center h={`${height / 2 + 116}px`}>
      <Container
        sx={{
          padding: '16px',
          maxWidth: '440px',
          overflow: 'hidden',
          backgroundColor: colors.white,
          margin: '0 auto',
          '@media (max-width: 40em)': {
            width: '90%',
          },
        }}
      >
        <Stack align="center" data-testid="attempts-header">
          <Text fw={700} size={20}>
            Sorry, too many wrong attempts
          </Text>
          <Text align="center" size={18} data-testid="attempts-body">
            5 incorrect attempts were made to enter the verification code.
            Please try again in an hour
          </Text>
          <Button fw={600} onClick={handleClickReenter}>
            RE-ENTER EMAIL
          </Button>
          <Anchor
            fw={600}
            size={18}
            sx={{
              color: colors.blue,
              backgroundColor: 'transparent',
              textDecoration: 'underline',
            }}
            onClick={handleSupportClick}
            data-testid="link-call-support"
          >
            Call support
          </Anchor>
        </Stack>
      </Container>
    </Center>
  );
};

export default PinLockout;

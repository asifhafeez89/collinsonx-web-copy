import {
  Anchor,
  Text,
  Center,
  Container,
  Box,
  Flex,
  Stack,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import LayoutLogin from '@components/LayoutLogin';
import colors from 'ui/colour-constants';
import { MaintenanceIcon } from '@collinsonx/design-system/assets/icons';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import { FAQ_PP, FAQ_LK } from '../config/Constants';
import usePayload from 'hooks/payload';
import { AccountProvider } from '@collinsonx/constants/enums';
import { verifyAccountProvider } from '../utils/VerifyAccountProvider';

const Maintenance = () => {
  const router = useRouter();
  const { payload } = usePayload();
  const handleSupportClick = () => {
    router.replace(
      verifyAccountProvider(payload?.accountProvider ?? AccountProvider.PP)
    );
  };
  const { height } = useViewportSize();

  return (
    <LayoutLogin>
      <Center h={`${height / 2 + 116}px`}>
        <Container
          sx={{
            padding: '16px',
            maxWidth: '440px',
            overflow: 'hidden',
            backgroundColor: colors.white,
            margin: '0 auto',
            '@media (max-width: 768px)': {
              width: '90%',
            },
          }}
        >
          <Box p={20} style={{ backgroundColor: colors.white }}>
            <Stack spacing={8} align="center">
              <Flex gap="xs" direction="row" align="center" justify="center">
                <MaintenanceIcon />
                <Text align="center" size={20} fw={700}>
                  Maintenance underway{' '}
                </Text>
              </Flex>
              <Text align="center">
                We're sorry, the booking service is temporarily unavailable as a
                system update is being performed. Please check back later or
                Contact support.
              </Text>
              <Flex gap="xs" direction="row" align="center" justify="center">
                <Text>Please return later or</Text>

                <Center>
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
                    Contact support
                  </Anchor>
                </Center>
              </Flex>
            </Stack>
          </Box>
        </Container>
      </Center>
    </LayoutLogin>
  );
};
export default Maintenance;

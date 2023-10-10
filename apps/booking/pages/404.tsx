import {
  Anchor,
  Container,
  Text,
  Center,
  Box,
  Stack,
} from '@collinsonx/design-system/core';
import { useRouter } from 'next/router';
import LayoutLogin from '@components/LayoutLogin';
import colors from 'ui/colour-constants';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import usePayload from 'hooks/payload';
import { AccountProvider } from '@collinsonx/constants/enums';
import { verifyAccountProvider } from '../utils/VerifyAccountProvider';
import BackButton from '@components/BackButton';
export default function Error404() {
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
            <Stack spacing={10} align="center">
              <Text align="center" size={20} fw={700}>
                404 - Page not found{' '}
              </Text>{' '}
              <Text align="center">
                The page you are looking for might have been removed or is
                temporarily unavailable.
              </Text>
              <Center>
                <BackButton>{`Return to lounge`.toUpperCase()}</BackButton>
              </Center>
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
            </Stack>
          </Box>
        </Container>
      </Center>
    </LayoutLogin>
  );
}
Error404.getLayout = (page: JSX.Element) => <>{page}</>;

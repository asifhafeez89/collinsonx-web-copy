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
import { MaintenanceIcon } from '@collinsonx/design-system/assets/icons';
import { useViewportSize } from '@collinsonx/design-system/hooks';
import usePayload from 'hooks/payload';
import { AccountProvider } from '@collinsonx/constants/enums';
import { verifyAccountProvider } from '../utils/VerifyAccountProvider';

import classes from '../styles/Maintenance.module.css';
import useLocale from 'hooks/useLocale';

const Maintenance = () => {
  const router = useRouter();
  const { payload } = usePayload();
  const handleSupportClick = () => {
    router.replace(
      verifyAccountProvider(payload?.accountProvider ?? AccountProvider.PP)
    );
  };
  const { height } = useViewportSize();
  const translations = useLocale();

  return (
    <LayoutLogin>
      <Center h={`${height / 2 + 116}px`}>
        <Container className={classes.container}>
          <Box p={20} className={classes.innerContainer}>
            <Stack gap={8} align="center">
              <Flex gap="xs" direction="row" align="center" justify="center">
                <MaintenanceIcon />
                <Text ta="center" size="xl" fw={700}>
                  {translations.auth.maintenance.title}{' '}
                </Text>
              </Flex>
              <Text ta="center">
                {translations.auth.maintenance.description}
              </Text>
              <Flex gap="xs" direction="row" align="center" justify="center">
                <Text>{translations.auth.maintenance.note}</Text>

                <Center>
                  <Anchor
                    fw={600}
                    size="lg"
                    className={classes.contact}
                    onClick={handleSupportClick}
                    data-testid="link-call-support"
                  >
                    {translations.auth.maintenance.btn.support}
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

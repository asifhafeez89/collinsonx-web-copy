import Heading from '@collinsonx/design-system/components/heading/Heading';
import { Box, Center, Flex, Stack } from '@collinsonx/design-system/core';
import { LoungeInfo } from '@components/LoungeInfo';
import useLocale from 'hooks/useLocale';
import classes from '../styles/ConfirmPayment.module.css';
import usePayload from 'hooks/payload';
import TopBarLinks from '@components/TopBarLinks';
import Layout from '@components/Layout';
import FlightDetailsBooking from '@components/FlightDetailsBooking';

export default function ConfirmAmendment() {
  const translations = useLocale();
  const pageName = 'confirmAmendment';

  const {
    locale,
    lounge,
    loungeCode,
    referrerUrl,
    consumerData,
    platform,
    jwt,
    payload,
  } = usePayload();

  return (
    <Layout>
      <Stack gap={8} className={classes.container}>
        <TopBarLinks page={pageName} />
        <Flex
          justify="center"
          align="center"
          direction="column"
          className={classes.containerOuter}
        >
          <Stack className={classes.containerInner}>
            <Center className={classes.titleContainer}>
              <Heading as="h1" padding={0} margin={0} lineHeight={1}>
                {translations.booking.confirmationPayment.amendTitle}
              </Heading>
            </Center>
            <Box className={classes.loungeInfo}>
              <LoungeInfo lounge={lounge} loading={!lounge} hideImageMobile />
            </Box>
            <FlightDetailsBooking pageName="Amendment" isRefund={false} />
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}
function getFlight() {
  throw new Error('Function not implemented.');
}

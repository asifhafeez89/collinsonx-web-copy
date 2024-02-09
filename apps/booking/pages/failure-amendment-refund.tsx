import Layout from '@components/Layout';

import { Box, Flex, Stack, Text, Title } from '@collinsonx/design-system/core';
import classes from '../styles/FailureBooking.module.css';
import TopBarLinks from '@components/TopBarLinks';
import { ANALYTICS_TAGS, PAGENAMES } from '../constants';
import { LoungeInfo } from '@components/LoungeInfo';
import usePayload from 'hooks/payload';
import BookingFormSkeleton from '@components/BookingFormSkeleton';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import useLocale from 'hooks/useLocale';
import { useEffect } from 'react';
import { logAction } from '@lib';

export default function FailureAmendmentRefund() {
  const pageName = PAGENAMES.FAILURE_AMEND_REFUND;
  const { lounge } = usePayload();
  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_REFUND_FAILED_AMEND);
  }, []);

  return (
    <Layout>
      <Stack gap={8} className={classes.container}>
        <Stack w="100%">
          <TopBarLinks page={pageName} />
        </Stack>
        <Flex
          justify="center"
          align="center"
          direction="column"
          className={classes.flexOuter}
        >
          <Stack gap={24} className={classes.flexInner}>
            <LoungeInfo lounge={lounge} loading={!lounge} />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              className={classes.flexContent}
            >
              {!lounge && <BookingFormSkeleton />}
              {lounge && (
                <Box>
                  <Stack>
                    <Box className={classes.description}>
                      <Title
                        style={{
                          fontSize: '1.5rem',
                          lineHeight: '2.25rem',
                          fontWeight: '700',
                          paddingBottom: '1rem',
                        }}
                      >
                        <AlertIcon
                          style={{ width: '1.3rem', height: '1.3rem' }}
                        />{' '}
                        {translations.booking.failureAmendmentRefund.title}
                      </Title>
                      <Text>
                        {
                          translations.booking.failureAmendmentRefund
                            .description
                        }
                      </Text>
                    </Box>
                  </Stack>
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

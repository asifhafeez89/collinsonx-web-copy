import Layout from '@components/Layout';

import {
  Anchor,
  Box,
  Flex,
  Stack,
  Text,
  Title,
} from '@collinsonx/design-system/core';

import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import { Button } from '@collinsonx/design-system';

import BookingFormSkeleton from '@components/BookingFormSkeleton';

import usePayload from 'hooks/payload';

import colors from 'ui/colour-constants';
import { BookingContext } from 'context/bookingContext';
import TopBarLinks from '@components/TopBarLinks';

import { MouseEventHandler, useCallback, useContext, useEffect } from 'react';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';
import { logAction, sendMobileEvent } from '@lib';
import { ANALYTICS_TAGS, MOBILE_ACTION_BACK, PAGENAMES } from '../constants';

import classes from '../styles/FailureBooking.module.css';
import useLocale from 'hooks/useLocale';

export default function BookingFailure() {
  const router = useRouter();
  const pageName = PAGENAMES.FAULURE_BOOKING;
  const { getBooking } = useContext(BookingContext);

  const { referrerUrl, lounge } = usePayload();
  const translations = useLocale();

  useEffect(() => {
    logAction(pageName, ANALYTICS_TAGS.ON_SLOT_MISSED);
  }, []);

  const handleClickBack: MouseEventHandler<HTMLAnchorElement> = useCallback(
    (e) => {
      if (window && !referrerUrl) {
        e.preventDefault();
        logAction(pageName, ANALYTICS_TAGS.ON_SLOT_SELECT_GO_TO_LOUNGE);
        const windowObj: any = window;
        sendMobileEvent(windowObj, MOBILE_ACTION_BACK);
      }
    },
    [referrerUrl]
  );

  const {
    children,

    adults,
    infants,
  } = getBooking();

  return (
    <Layout>
      <Stack gap={16} className={classes.container}>
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
                        }}
                      >
                        <AlertIcon
                          style={{ width: '1.3rem', height: '1.3rem' }}
                        />{' '}
                        {translations.booking.failureBooking.declined.title}
                      </Title>
                      <Text>
                        {
                          translations.booking.failureBooking.declined
                            .description
                        }
                      </Text>
                      <Box mt="1.5rem">
                        <Text>
                          {translations.booking.failureBooking.declined.note}
                        </Text>
                      </Box>
                    </Box>
                  </Stack>
                  <Flex justify="center" align={'center'} direction={'column'}>
                    <Button
                      type="submit"
                      data-testid="submit"
                      spacing="1.25rem"
                      align="center"
                      handleClick={() => {
                        router.push({
                          pathname: '/',
                        });
                        logAction(
                          pageName,
                          ANALYTICS_TAGS.ON_SLOT_SELECT_ANOTHER
                        );
                      }}
                    >
                      {
                        translations.booking.failureBooking.declined.btn
                          .selectAnotherTime
                      }
                    </Button>

                    <Anchor
                      target="_top"
                      href={referrerUrl ? referrerUrl : '#'}
                      onClick={handleClickBack}
                      style={{
                        textDecoration: 'underline',
                        color: colors.blue,
                        fontSize: '1.125rem',
                        lineHeight: '1.75rem',
                        fontWeight: '600',
                        marginTop: '0.75rem',
                      }}
                    >
                      {
                        translations.booking.failureBooking.declined.btn
                          .returnToLounge
                      }
                    </Anchor>
                  </Flex>
                </Box>
              )}
            </Flex>
          </Stack>
        </Flex>
      </Stack>
    </Layout>
  );
}

BookingFailure.getLayout = (page: JSX.Element) => <>{page}</>;

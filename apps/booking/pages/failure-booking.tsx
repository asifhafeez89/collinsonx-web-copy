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
import { ANALYTICS_TAGS, MOBILE_ACTION_BACK } from '../constants';

export default function BookingFailure() {
  const router = useRouter();
  const pageName = 'Slot_Mis';
  const { getBooking } = useContext(BookingContext);

  const { referrerUrl, lounge } = usePayload();

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
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <Stack sx={{ width: '100%' }}>
          <TopBarLinks page={pageName} />
        </Stack>
        <Flex
          justify="center"
          align="center"
          direction="column"
          sx={{
            justifyContent: 'center',

            '@media (max-width: 768px)': {
              width: '100%',
              justifyContent: 'initial',

              backgroundColor: colors.background,
            },
          }}
        >
          <Stack
            spacing={24}
            sx={{
              width: '591px',

              '@media (max-width: 768px)': {
                width: '100%',
                margin: '0',
              },
            }}
          >
            <LoungeInfo lounge={lounge} loading={!lounge} />
            <Flex
              gap={{ base: 'sm', sm: 'lg' }}
              sx={{
                width: '100%',
                flexDirection: 'row',

                '@media (max-width: 768px)': {
                  flexDirection: 'column',
                },
              }}
            >
              {!lounge && <BookingFormSkeleton />}
              {lounge && (
                <Box>
                  <Stack>
                    <Box
                      sx={{
                        '@media (max-width: 768px)': {
                          background: colors.white,
                          padding: '20px',
                        },
                      }}
                    >
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
                        Your booking has been declined.
                      </Title>
                      <Text>
                        We're sorry but during the payment process the capacity
                        for the lounge changed and we are no longer able to
                        confirm your booking. You will be refunded any payment
                        made.
                      </Text>
                      <Box sx={{ marginTop: '1.5rem' }}>
                        <Text>
                          Please consider booking another time slot, or check to
                          see if another lounge is available.
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
                      SELECT ANOTHER TIME
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
                      Return to lounges
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

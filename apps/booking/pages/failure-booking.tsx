import Layout from '@components/Layout';

import { Box, Flex, Stack, Text, Title } from '@collinsonx/design-system/core';

import { useRouter } from 'next/router';
import { LoungeInfo } from '@components/LoungeInfo';
import { Button } from '@collinsonx/design-system';

import BookingFormSkeleton from '@components/BookingFormSkeleton';

import usePayload from 'hooks/payload';

import colors from 'ui/colour-constants';
import { BookingContext } from 'context/bookingContext';
import BackToLounge from '@components/BackToLounge';

import { useContext } from 'react';
import { AlertIcon } from '@collinsonx/design-system/assets/icons';

export default function BookingFailure() {
  const router = useRouter();

  const { getBooking } = useContext(BookingContext);

  const {
    children,

    adults,
    infants,
  } = getBooking();

  const { referrerUrl, lounge } = usePayload();

  return (
    <Layout>
      <Stack spacing={16} sx={{ backgroundColor: colors.background }}>
        <Stack sx={{ width: '100%' }}>
          <BackToLounge />
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
            <LoungeInfo
              guests={{ adults, children, infants }}
              lounge={lounge}
              loading={!lounge}
            />
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
                        Your booking has been cancelled.
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
                  <Flex
                    justify="center"
                    direction={{ base: 'column', sm: 'row' }}
                  >
                    <Button
                      type="submit"
                      data-testid="submit"
                      spacing="1.25rem"
                      align="center"
                      variant="outline"
                      handleClick={() => {
                        if (window) {
                          window.location.href = referrerUrl ?? '/';
                        }
                      }}
                    >
                      SEE OTHER LOUNGES
                    </Button>

                    <Button
                      type="submit"
                      data-testid="submit"
                      spacing="1.25rem"
                      align="center"
                      handleClick={() =>
                        router.push({
                          pathname: '/',
                        })
                      }
                    >
                      SELECT ANOTHER TIME
                    </Button>
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

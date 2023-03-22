import Layout from '@components/Layout';
import {
  Title,
  Text,
  Grid,
  Button,
  Stack,
  Flex,
} from '@collinsonx/design-system/core';
import OverviewCard from '@components/OverviewCard';
import OverviewMetric from '@components/OverviewMetric';
import Error from '@components/Error';
import OverviewSeparator from '@components/OverviewSeparator';
import Link from 'next/link';
import { useQuery } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
import { useMemo } from 'react';

const { Initialized, Confirmed, Declined, CheckedIn } = BookingStatus;

export default function Overview() {
  const { loading, error, data } = useQuery<{ getBookings: Booking[] }>(
    getBookings
  );

  const bookings = useMemo<Record<BookingStatus, Booking[]>>(() => {
    return getBookingsByType(data?.getBookings ?? []) as Record<
      BookingStatus,
      Booking[]
    >;
  }, [data]);

  const bookingsConfirmed =
    (bookings[Confirmed]?.length || 0) + (bookings[CheckedIn]?.length || 0);

  return (
    <>
      {error ? (
        <Error error={error} />
      ) : (
        <>
          <Title mb={8} size={32}>
            Booking overview
          </Title>
          <Text mb={33} size={18}>
            {/*lounge.name*/}
          </Text>
          <Grid>
            <Grid.Col lg={6}>
              <Stack spacing={24}>
                <OverviewCard title="Pending bookings" variant="pending">
                  <>
                    {!loading && !bookings[Initialized]?.length ? (
                      'You have no pending bookings'
                    ) : (
                      <OverviewMetric
                        label="Recent bookings"
                        loading={loading}
                        value={bookings[Initialized]?.length}
                      >
                        <Link href="/bookings/pending" passHref>
                          <Button
                            variant="default"
                            sx={{ width: 'fit-content' }}
                          >
                            View all
                          </Button>
                        </Link>
                      </OverviewMetric>
                    )}
                  </>
                </OverviewCard>
                <OverviewCard title="Declined bookings" variant="declined">
                  {!loading && !bookings[Declined]?.length ? (
                    'You have no declined bookings'
                  ) : (
                    <OverviewMetric
                      loading={loading}
                      label="Recent cancelled"
                      value={bookings[Declined]?.length}
                    >
                      <Link href="/bookings/declined" passHref>
                        <Button variant="default" sx={{ width: 'fit-content' }}>
                          View all
                        </Button>
                      </Link>
                    </OverviewMetric>
                  )}
                </OverviewCard>
              </Stack>
            </Grid.Col>
            <Grid.Col lg={6}>
              <OverviewCard title="Confirmed bookings" variant="confirmed">
                <>
                  {!loading && !bookingsConfirmed ? (
                    'You have no confirmed bookings'
                  ) : (
                    <Flex gap={72}>
                      <OverviewMetric
                        loading={loading}
                        label="Today's bookings"
                        value={bookingsConfirmed}
                      >
                        <Link href="/bookings/confirmed" passHref>
                          <Button
                            variant="default"
                            sx={{ width: 'fit-content' }}
                          >
                            Today&apos;s bookings
                          </Button>
                        </Link>
                      </OverviewMetric>
                      <Flex justify="center">
                        <OverviewSeparator />
                      </Flex>
                      <OverviewMetric
                        loading={loading}
                        label="All bookings"
                        value={bookingsConfirmed}
                      >
                        <Link href="/bookings/confirmed" passHref>
                          <Button
                            variant="default"
                            sx={{ width: 'fit-content' }}
                          >
                            View all
                          </Button>
                        </Link>
                      </OverviewMetric>
                    </Flex>
                  )}
                </>
              </OverviewCard>
            </Grid.Col>
          </Grid>
        </>
      )}
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

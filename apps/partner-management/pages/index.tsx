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
import getBookings from '@collinsonx/utils/queries/getBookings';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
import { useMemo, useState } from 'react';
import { isErrorValid } from 'lib';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import getSelectedLounge from 'lib/getSelectedLounge';

const { Pending, Confirmed, Declined, Cancelled, CheckedIn } = BookingStatus;

export default function Overview() {
  const loungeData = getSelectedLounge();
  const [lastUpdate, setLastUpdate] = useState<String>();
  const { loading, error, data } = useQuery<{ getBookings: Booking[] }>(
    getBookings,
    {
      variables: {
        experienceId: loungeData?.id,
      },
      skip: !loungeData?.id,
      pollInterval: 300000,
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: () =>
        setLastUpdate(dayjsTz(new Date()).format('YYYY-MM-DD HH:mm')),
    }
  );

  const bookings = useMemo<Record<BookingStatus, Booking[]>>(() => {
    return getBookingsByType(data?.getBookings ?? []) as Record<
      BookingStatus,
      Booking[]
    >;
  }, [data]);

  const bookingsConfirmed =
    (bookings[Confirmed]?.length || 0) + (bookings[CheckedIn]?.length || 0);

  const bookingsDeclined =
    (bookings[Declined]?.length || 0) + (bookings[Cancelled]?.length || 0);

  const todaysConfirmed = useMemo(() => {
    if (bookings) {
      const allConfirmed = [
        ...(bookings[Confirmed] || []),
        ...(bookings[CheckedIn] || []),
      ];
      return allConfirmed.filter(
        (item) =>
          dayjsTz(item.bookedFrom).format('YYYY-MM-DD') ==
          dayjsTz(new Date()).format('YYYY-MM-DD')
      );
    } else {
      return [];
    }
  }, [bookings]);

  return (
    <>
      {error && isErrorValid(error) ? (
        <Error error={error} />
      ) : (
        <>
          <Title mb={8} size={32}>
            Booking overview
          </Title>
          <Text mb={33} size={10}>
            {/*lounge.name*/}
          </Text>
          <Grid>
            <Grid.Col lg={6}>
              <Stack spacing={24}>
                <OverviewCard title="Pending requests" variant="pending">
                  <>
                    {!loading && !bookings[Pending]?.length ? (
                      'You have no pending requests'
                    ) : (
                      <Flex gap={72} maw="40%">
                        <OverviewMetric
                          loading={loading}
                          label="Recent pending"
                          value={bookings[Pending]?.length || 0}
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
                      </Flex>
                    )}
                  </>
                </OverviewCard>
                <OverviewCard
                  title="Declined / cancelled bookings"
                  variant="declined"
                >
                  {!loading && !bookingsDeclined ? (
                    'You have no cancelled bookings'
                  ) : (
                    <Flex gap={72} maw="40%">
                      <OverviewMetric
                        loading={loading}
                        label="Recent cancelled"
                        value={bookingsDeclined}
                      >
                        <Link href="/bookings/declined" passHref>
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
                        value={todaysConfirmed?.length}
                      >
                        <Link
                          href={{
                            pathname: '/bookings/confirmed',
                            query: {
                              date: dayjsTz(new Date()).format('YYYY-MM-DD'),
                            },
                          }}
                          passHref
                        >
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
          <Text mb={33} mt={33} size={10}>
            {lastUpdate && `Last updated ${lastUpdate}`}
          </Text>
        </>
      )}
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

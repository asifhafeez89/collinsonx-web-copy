import Layout from '@components/Layout';
import bookingsMock from 'bookings.json';
import {
  Title,
  Text,
  Grid,
  Button,
  Stack,
  Flex,
} from '@collinsonx/design-system/core';
import OverviewCard from '@components/OverviewCard';
import OverviewMetric from '../components/OverviewMetric';
import OverviewSeparator from '@components/OverviewSeparator';
import Link from 'next/link';
const { bookings, lounge } = bookingsMock;

type Status = 'PENDING' | 'CONFIRMED' | 'DECLINED';
const totalBookings = bookings.reduce((prev, cur) => {
  const status = cur.booking_status as Status;
  prev[status] = prev[status] || [];
  prev[status].push(cur);
  return prev;
}, {} as Record<Status, any[]>);

export default function Overview() {
  return (
    <>
      <Title mb={8} size={32}>
        Booking overview
      </Title>
      <Text mb={33} size={18}>
        {lounge.name}
      </Text>
      <Grid>
        <Grid.Col lg={6}>
          <Stack spacing={24}>
            <OverviewCard title="Pending bookings" variant="warning">
              {/* demo purposes */}
              <>
                {false ? (
                  'You have no pending bookings'
                ) : (
                  <OverviewMetric
                    label="Recent bookings"
                    value={totalBookings.PENDING.length}
                  >
                    <Link href="/bookings/pending" passHref>
                      <Button variant="default" sx={{ width: 'fit-content' }}>
                        View all
                      </Button>
                    </Link>
                  </OverviewMetric>
                )}
              </>
            </OverviewCard>
            <OverviewCard title="Declined bookings" variant="danger">
              {!totalBookings.DECLINED.length ? (
                'You have no declined bookings'
              ) : (
                <OverviewMetric
                  label="Recent cancelled"
                  value={totalBookings.DECLINED.length}
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
          <OverviewCard title="Confirmed bookings" variant="success">
            <>
              {!totalBookings.CONFIRMED.length ? (
                'You have no confirmed bookings'
              ) : (
                <Flex gap={72}>
                  <OverviewMetric
                    label="Today's bookings"
                    value={totalBookings.CONFIRMED.length}
                  >
                    <Link href="/bookings/confirmed" passHref>
                      <Button variant="default" sx={{ width: 'fit-content' }}>
                        Today&apos;s bookings
                      </Button>
                    </Link>
                  </OverviewMetric>
                  <Flex justify="center">
                    <OverviewSeparator />
                  </Flex>
                  <OverviewMetric
                    label="All bookings"
                    value={totalBookings.CONFIRMED.length}
                  >
                    <Link href="/bookings/confirmed" passHref>
                      <Button variant="default" sx={{ width: 'fit-content' }}>
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
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

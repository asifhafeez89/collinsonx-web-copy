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
import { GetServerSideProps } from 'next';
import { client } from '@collinsonx/utils/apollo';
import { getBookings } from '@collinsonx/utils/queries';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { getBookingsByType } from '@collinsonx/utils/lib';
const { lounge } = bookingsMock;

const { Initialized, Confirmed, Declined } = BookingStatus;

export default function Overview({
  bookings,
}: {
  bookings: Record<BookingStatus, Booking[]>;
}) {
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
              <>
                {!bookings[Initialized] || !bookings[Initialized]?.length ? (
                  'You have no pending bookings'
                ) : (
                  <OverviewMetric
                    label="Recent bookings"
                    value={bookings[Initialized].length}
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
              {!bookings[Declined] || !bookings[Declined]?.length ? (
                'You have no declined bookings'
              ) : (
                <OverviewMetric
                  label="Recent cancelled"
                  value={bookings[Declined].length}
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
              {!bookings[Confirmed] || !bookings[Confirmed]?.length ? (
                'You have no confirmed bookings'
              ) : (
                <Flex gap={72}>
                  <OverviewMetric
                    label="Today's bookings"
                    value={bookings[Confirmed].length}
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
                    value={bookings[Confirmed].length}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({
    query: getBookings,
  });

  const bookings = getBookingsByType(data.getBookings);
  return {
    props: { bookings },
  };
};

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

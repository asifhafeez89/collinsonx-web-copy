import Layout from '@components/Layout';
import {
  Title,
  Text,
  Grid,
  Button,
  Stack,
  Flex,
  Box,
  Skeleton,
} from '@collinsonx/design-system/core';
import OverviewCard from '@components/OverviewCard';
import OverviewMetric from '@components/OverviewMetric';
import Error from '@components/Error';
import OverviewSeparator from '@components/OverviewSeparator';
import Link from 'next/link';
import { useQuery } from '@collinsonx/utils/apollo';
import getBookingsOverview from '@collinsonx/utils/queries/getBookingsOverview';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import getLoungeTitle from 'lib/getLoungeTitle';
import {
  attemptRefreshingSession,
  useSessionContext,
} from 'supertokens-auth-react/recipe/session';
import { FourSquares } from '@collinsonx/design-system/assets/icons';
import { useExperience } from 'hooks/experience';
import PageTitle from '@components/PageTitle';
import LoadExperiences from '@components/LoadExperiences';

const { Pending, Confirmed, Declined, Cancelled, CheckedIn } = BookingStatus;

export default function Overview() {
  const session: any = useSessionContext();

  const { experience, setExperience } = useExperience();

  const [lastUpdate, setLastUpdate] = useState<String>();

  const {
    loading: loadingPending,
    error: errorPending,
    data: dataPending,
  } = useQuery<{ getBookings: Booking[] }>(getBookingsOverview, {
    variables: {
      experienceId: experience.id,
      status: Pending,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const {
    loading: loadingConfirmed,
    error: errorConfirmed,
    data: dataConfirmed,
  } = useQuery<{ getBookings: Booking[] }>(getBookingsOverview, {
    variables: {
      experienceId: experience.id,
      status: Confirmed,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const {
    loading: loadingCheckedIn,
    error: errorCheckedIn,
    data: dataCheckedIn,
  } = useQuery<{ getBookings: Booking[] }>(getBookingsOverview, {
    variables: {
      experienceId: experience.id,
      status: CheckedIn,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const {
    loading: loadingDeclined,
    error: errorDeclined,
    data: dataDeclined,
  } = useQuery<{ getBookings: Booking[] }>(getBookingsOverview, {
    variables: {
      experienceId: experience.id,
      status: Declined,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const {
    loading: loadingCancelled,
    error: errorCancelled,
    data: dataCancelled,
  } = useQuery<{ getBookings: Booking[] }>(getBookingsOverview, {
    variables: {
      experienceId: experience.id,
      status: Cancelled,
    },
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      attemptRefreshingSession().then((success: any) => {});
      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const bookingsConfirmed =
    (dataConfirmed?.getBookings.length || 0) +
    (dataCheckedIn?.getBookings.length || 0);

  const bookingsDeclined =
    (dataDeclined?.getBookings.length || 0) +
    (dataCancelled?.getBookings.length || 0);

  const todaysConfirmed = useMemo(() => {
    if (dataConfirmed && dataCheckedIn) {
      const allConfirmed = [
        ...(dataConfirmed.getBookings || []),
        ...(dataCheckedIn.getBookings || []),
      ];
      return allConfirmed.filter(
        (item) =>
          dayjs(item.bookedFrom).format('YYYY-MM-DD') ==
          dayjs(new Date()).format('YYYY-MM-DD')
      );
    } else {
      return [];
    }
  }, [dataConfirmed, dataCheckedIn]);

  if (session.accessTokenPayload.userType !== 'SUPER_USER') {
    if (!experience) {
      return (
        <Box py={40} px={32}>
          Experience could not be found
        </Box>
      );
    }
  }

  return (
    <>
      <Error error={errorPending} />
      <Error error={errorConfirmed} />
      <Error error={errorCheckedIn} />
      <Error error={errorCancelled} />
      <Error error={errorDeclined} />
      <PageTitle title="Booking overview" />
      <Title mb={8} size={32} data-testid="bookingOverviewTitle">
        Booking overview
      </Title>
      {session.accessTokenPayload.userType !== 'SUPER_USER' && (
        <Text mb={33} size={18} data-testid="loungeTitle">
          {getLoungeTitle(experience)}
        </Text>
      )}
      {session.accessTokenPayload.userType === 'SUPER_USER' && (
        <Stack mb={33} sx={{ width: '300px' }}>
          {/* TODO: Add a check if the user is a superUser  */}

          <LoadExperiences
            onExperienceSelected={(newExperience) => {
              setExperience(newExperience);
            }}
            selectedExperience={experience}
          />
        </Stack>
      )}
      <Grid>
        <Grid.Col lg={6}>
          <Stack spacing={24}>
            <OverviewCard
              title="Pending requests"
              variant="pending"
              datatestid="pendingRequestsTitle"
            >
              <>
                {!loadingPending && !dataPending?.getBookings.length ? (
                  'You have no pending requests'
                ) : (
                  <Flex gap={72} maw="40%">
                    <OverviewMetric
                      loading={loadingPending}
                      label="Recent pending"
                      value={dataPending?.getBookings.length || 0}
                      datatestid="pendingRequestsCount"
                    >
                      <Link href="/bookings/pending" passHref>
                        <Button
                          variant="default"
                          sx={{ width: 'fit-content' }}
                          data-testid="viewAllPendingRequests"
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
              datatestid="cancelledBookingsTitle"
            >
              {!loadingDeclined && !loadingCancelled && !bookingsDeclined ? (
                'You have no cancelled bookings'
              ) : (
                <Flex gap={72} maw="40%">
                  <OverviewMetric
                    loading={loadingDeclined || loadingCancelled}
                    label="Recent cancelled"
                    value={bookingsDeclined}
                    datatestid="declinedBookingsCount"
                  >
                    <Link href="/bookings/declined" passHref>
                      <Button
                        variant="default"
                        sx={{ width: 'fit-content' }}
                        data-testid="viewAllDeclined"
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
          <Stack spacing={24}>
            <OverviewCard
              title="Confirmed bookings"
              variant="confirmed"
              datatestid="confirmedBookingsTitle"
            >
              <>
                {!loadingConfirmed &&
                !loadingCheckedIn &&
                !bookingsConfirmed ? (
                  'You have no confirmed bookings'
                ) : (
                  <Flex gap={72}>
                    <OverviewMetric
                      loading={loadingConfirmed || loadingCheckedIn}
                      label="Today's bookings"
                      value={todaysConfirmed?.length}
                      datatestid="todaysBookingsCount"
                    >
                      <Link
                        href={{
                          pathname: '/bookings/confirmed',
                          query: {
                            date: dayjs(new Date()).format('YYYY-MM-DD'),
                          },
                        }}
                        passHref
                      >
                        <Button
                          variant="default"
                          sx={{ width: 'fit-content' }}
                          data-testid="viewTodaysBookings"
                        >
                          Today&apos;s bookings
                        </Button>
                      </Link>
                    </OverviewMetric>
                    <Flex justify="center">
                      <OverviewSeparator />
                    </Flex>
                    <OverviewMetric
                      loading={loadingConfirmed || loadingCheckedIn}
                      label="All bookings"
                      value={bookingsConfirmed}
                      datatestid="allBookingsCount"
                    >
                      <Link href="/bookings/confirmed" passHref>
                        <Button
                          variant="default"
                          sx={{ width: 'fit-content' }}
                          data-testid="viewAllConfirmed"
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
              title="Walk-up QR code"
              variant="qrcodewalkup"
              icon={<FourSquares />}
              datatestid="walkupQRcodeTitle"
            >
              <Skeleton visible={false}>
                <Stack spacing={82}>
                  <Text color="#9b9ca0" size={16} weight={600}>
                    Reveal the QR code used for Walk-up customers
                  </Text>
                  <Link
                    href="/qr-code"
                    passHref
                    style={{ width: 'fit-content' }}
                  >
                    <Button
                      variant="default"
                      sx={{ width: 'fit-content' }}
                      data-testid="viewQRcode"
                    >
                      View
                    </Button>
                  </Link>
                </Stack>
              </Skeleton>
            </OverviewCard>
          </Stack>
        </Grid.Col>
      </Grid>
      <Text mb={33} mt={33} size={10}>
        {lastUpdate && `Last updated ${lastUpdate}`}
      </Text>
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

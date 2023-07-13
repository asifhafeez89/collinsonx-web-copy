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
import { SELECTED_LOUNGE } from 'config';
import OverviewCard from '@components/OverviewCard';
import OverviewMetric from '@components/OverviewMetric';
import Error from '@components/Error';
import OverviewSeparator from '@components/OverviewSeparator';
import Link from 'next/link';
import { useQuery } from '@collinsonx/utils/apollo';
import getBookings from '@collinsonx/utils/queries/getBookings';
import { Booking, BookingStatus, Experience } from '@collinsonx/utils';
import { getBookingsByType, setItem } from '@collinsonx/utils/lib';
import { useEffect, useMemo, useState } from 'react';
import { isErrorValid } from 'lib';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import getLoungeTitle from 'lib/getLoungeTitle';
import experiences from '../data/experiences.json';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { FourSquares } from '@collinsonx/design-system/assets/icons';
import { useExperience } from 'hooks/experience';
import PageTitle from '@components/PageTitle';
import LoadExperiences from '@components/LoadExperiences';

const { Pending, Confirmed, Declined, Cancelled, CheckedIn } = BookingStatus;

export default function Overview() {
  const session: any = useSessionContext();

  const { experience, setExperience } = useExperience();

  const [lastUpdate, setLastUpdate] = useState<String>();

  const { loading, error, data } = useQuery<{ getBookings: Booking[] }>(
    getBookings,
    {
      variables: {
        experienceId: experience.id,
      },
      pollInterval: 300000,
      fetchPolicy: 'network-only',
      notifyOnNetworkStatusChange: true,
      onCompleted: () =>
        setLastUpdate(
          new Date().toLocaleDateString() +
          ' ' +
          new Date().toLocaleTimeString()
        ),
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

  if (session.accessTokenPayload.userType !== 'SUPER_USER') {
    if (!experience) {
      return (
        <Box py={40} px={32}>
          Experience could not be found
        </Box>
      );
    }
  }

  const experiencesFiltered = experiences.map((experience) => {
    return {
      value: experience.id,
      label: `${experience.loungeName}${experience.location?.terminal
        ? ' - ' + experience.location?.terminal
        : ''
        }`,
    };
  });

  return (
    <>
      {error && isErrorValid(error) ? (
        <Error error={error} />
      ) : (
        <>
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
                    {!loading && !bookings[Pending]?.length ? (
                      'You have no pending requests'
                    ) : (
                      <Flex gap={72} maw="40%">
                        <OverviewMetric
                          loading={loading}
                          label="Recent pending"
                          value={bookings[Pending]?.length || 0}
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
                  {!loading && !bookingsDeclined ? (
                    'You have no cancelled bookings'
                  ) : (
                    <Flex gap={72} maw="40%">
                      <OverviewMetric
                        loading={loading}
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
            </Grid.Col >
            <Grid.Col lg={6}>
              <Stack spacing={24}>
                <OverviewCard
                  title="Confirmed bookings"
                  variant="confirmed"
                  datatestid="confirmedBookingsTitle"
                >
                  <>
                    {!loading && !bookingsConfirmed ? (
                      'You have no confirmed bookings'
                    ) : (
                      <Flex gap={72}>
                        <OverviewMetric
                          loading={loading}
                          label="Today's bookings"
                          value={todaysConfirmed?.length}
                          datatestid="todaysBookingsCount"
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
                          loading={loading}
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
                  <Skeleton visible={loading}>
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
            </Grid.Col >
          </Grid >
          <Text mb={33} mt={33} size={10}>
            {lastUpdate && `Last updated ${lastUpdate}`}
          </Text>
        </>
      )
      }
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

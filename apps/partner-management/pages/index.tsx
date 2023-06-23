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
import { getBookingsByType } from '@collinsonx/utils/lib';
import { useEffect, useMemo, useState } from 'react';
import { isErrorValid } from 'lib';
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import getSelectedLounge from 'lib/getSelectedLounge';
import getLoungeTitle from 'lib/getLoungeTitle';
import SelectInput from '@collinsonx/design-system/components/inputselect';
import experiences from '../data/experiences.json';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';
import { FourSquares } from '@collinsonx/design-system/assets/icons';

const { Pending, Confirmed, Declined, Cancelled, CheckedIn } = BookingStatus;

export default function Overview() {
  const session: any = useSessionContext();

  const loungeData = getSelectedLounge();
  const [lastUpdate, setLastUpdate] = useState<String>();

  const [experienceId, setSelectExperience] = useState<String>(
    experiences[0].id
  );

  useEffect(() => {
    const selectedExperienceId = localStorage.getItem(SELECTED_LOUNGE);

    if (selectedExperienceId) {
      setSelectExperience(JSON.parse(selectedExperienceId).id);
    }
  }, []);

  useEffect(() => {
    const selectedLounge = experiences.filter((lounge) => {
      return lounge.id === experienceId;
    });

    if (session.accessTokenPayload.userType === 'SUPER_USER') {
      localStorage.setItem(SELECTED_LOUNGE, JSON.stringify(selectedLounge[0]));
    }
  }, [experienceId, session.accessTokenPayload.userType]);

  const { loading, error, data } = useQuery<{ getBookings: Booking[] }>(
    getBookings,
    {
      variables: {
        experienceId:
          session.accessTokenPayload.userType !== 'SUPER_USER'
            ? loungeData?.id
            : experienceId,
      },
      skip: !loungeData?.id,
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
    if (!loungeData) {
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
      label: `${experience.loungeName}${
        experience.location?.terminal
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
          <Title mb={8} size={32}>
            Booking overview
          </Title>
          {session.accessTokenPayload.userType !== 'SUPER_USER' && (
            <Text mb={33} size={18}>
              {getLoungeTitle(loungeData)}
            </Text>
          )}
          {session.accessTokenPayload.userType === 'SUPER_USER' && (
            <Stack mb={33} sx={{ width: '300px' }}>
              {/* TODO: Add a check if the user is a superUser  */}

              <SelectInput
                styles={{
                  root: {
                    width: '400px',
                  },
                }}
                data={experiencesFiltered}
                onChange={async (id) => {
                  setSelectExperience(id ?? '');
                }}
                value={experienceId.toString()}
              />
            </Stack>
          )}

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
              <Stack spacing={24}>
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
                <OverviewCard
                  title="Walk-up QR code"
                  variant="qrcodewalkup"
                  icon={<FourSquares />}
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
                        <Button variant="default" sx={{ width: 'fit-content' }}>
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
      )}
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

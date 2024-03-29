import Layout from '@components/Layout';
import { Title, Box, Stack, Grid, Text } from '@collinsonx/design-system/core';
import { GetServerSideProps } from 'next';
import DetailsView from '@components/Details';
import Error from '@components/Error';
import Notification from '@components/Notification';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import { Booking, BookingStatus } from '@collinsonx/utils';
import getBookings from '@collinsonx/utils/queries/getBookings';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
import {
  declineBooking as declineBookingMutation,
  confirmBooking as confirmBookingMutation,
} from '@collinsonx/utils/mutations';
import { useRouter } from 'next/router';
import { bookingConfig } from 'config/booking';
import { isErrorValid } from 'lib';
import { useMemo, useState } from 'react';
import getLoungeTitle from 'lib/getLoungeTitle';
import useExperience from 'hooks/experience';
import PageTitle from '@components/PageTitle';
import { attemptRefreshingSession } from 'supertokens-auth-react/recipe/session';

interface DetailsProps {
  id: string;
}

const { Pending } = BookingStatus;

export default function Details({ id }: DetailsProps) {
  const router = useRouter();

  const { experience, setExperience } = useExperience();

  const {
    loading,
    error: fetchError,
    data,
  } = useQuery<{ getBookings: Booking[] }>(getBookings, {
    variables: {
      experienceId: experience?.id,
    },
    skip: !experience?.id,
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // HACK
      attemptRefreshingSession().then((success: any) => {});

      setLastUpdate(
        new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
      );
    },
  });

  const booking = useMemo(() => {
    return data?.getBookings.find((item) => item.id === id);
  }, [data, id]);

  const [
    declineBooking,
    { loading: loadingDecline, error: declineError, data: dataDecline },
  ] = useMutation(declineBookingMutation);

  const [
    confirmBooking,
    { loading: loadingConfirm, error: confirmError, data: dataConfirm },
  ] = useMutation(confirmBookingMutation);

  const status = booking?.status || null;

  const [lastUpdate, setLastUpdate] = useState<String>();

  const handleClickConfirm = () => {
    confirmBooking({
      variables: { confirmBookingId: id },
      onCompleted: (data) => {
        if (data.confirmBooking) {
          router.push('/');
        }
      },
    });
  };
  const handleClickDecline = () => {
    declineBooking({
      variables: { declineBookingId: id },
      onCompleted: (data) => {
        if (data.declineBooking) {
          router.push('/');
        }
      },
    });
  };

  if (!experience) {
    <Box py={40} px={32}>
      Experience could not be found
    </Box>;
  }

  if (!loading && !fetchError && !booking) {
    return (
      <>
        <PageTitle title="Customer booking details" />
        <Box py={40} px={32}>
          Booking could not be found
        </Box>
      </>
    );
  }

  return (
    <>
      <PageTitle title="Customer booking details" />
      {status && (
        <Notification type={status}>
          {bookingConfig[status].description}
        </Notification>
      )}
      {fetchError && isErrorValid(fetchError) ? (
        <Error error={fetchError} />
      ) : (
        <Box py={40} px={32}>
          <Stack gap={32}>
            <Box>
              <Title mb={8} size={32}>
                Customer booking details{' '}
              </Title>
              <Text size="lg">{getLoungeTitle(experience)}</Text>
              {lastUpdate && `Last updated ${lastUpdate}`}
            </Box>
            <Error error={declineError} />
            <Error error={confirmError} />
            <Grid>
              <Grid.Col span={{ lg: 8, md: 8 }}>
                <Box
                  maw={712}
                  p={40}
                  style={{ borderRadius: 4, border: '1px solid #DDDDDD' }}
                >
                  <DetailsView booking={booking} loading={loading}>
                    {status === Pending ? (
                      <DetailsPendingActions
                        onClickConfirm={handleClickConfirm}
                        onClickDecline={handleClickDecline}
                      />
                    ) : undefined}
                  </DetailsView>
                </Box>
              </Grid.Col>
            </Grid>
          </Stack>
        </Box>
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params?.id as string;
  if (!id) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      id,
    },
  };
};

Details.getLayout = (page: JSX.Element) => {
  return (
    <Layout headerNavProps={{ section: 'booking' }} hasPadding={false}>
      {page}
    </Layout>
  );
};

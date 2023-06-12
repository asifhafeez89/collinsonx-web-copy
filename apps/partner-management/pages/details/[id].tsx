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
import dayjsTz from '@collinsonx/utils/lib/dayjsTz';
import getSelectedLounge from 'lib/getSelectedLounge';
import getLoungeTitle from 'lib/getLoungeTitle';

interface DetailsProps {
  id: string;
}

const { Pending } = BookingStatus;

export default function Details({ id }: DetailsProps) {
  const router = useRouter();

  const loungeData = getSelectedLounge();

  const {
    loading,
    error: fetchError,
    data,
  } = useQuery<{ getBookings: Booking[] }>(getBookings, {
    variables: {
      experienceId: loungeData?.id,
    },
    skip: !loungeData?.id,
    pollInterval: 300000,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: () =>
      setLastUpdate(dayjsTz(new Date()).format('YYYY-MM-DD HH:mm')),
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

  if (!loungeData) {
    <Box py={40} px={32}>
      Experience could not be found
    </Box>;
  }

  if (!loading && !fetchError && !booking) {
    return (
      <Box py={40} px={32}>
        Booking could not be found
      </Box>
    );
  }

  return (
    <>
      {status && (
        <Notification type={status}>
          {bookingConfig[status].description}
        </Notification>
      )}
      {fetchError && isErrorValid(fetchError) ? (
        <Error error={fetchError} />
      ) : (
        <Box py={40} px={32}>
          <Stack spacing={32}>
            <Box>
              <Title mb={8} size={32}>
                Customer booking details{' '}
                {lastUpdate && `Last updated ${lastUpdate}`}
              </Title>
              <Text size={18}>{getLoungeTitle(loungeData)}</Text>
            </Box>
            <Error error={declineError} />
            <Error error={confirmError} />
            <Grid>
              <Grid.Col lg={8} md={8}>
                <Box
                  maw={712}
                  p={40}
                  sx={{ borderRadius: 4, border: '1px solid #DDDDDD' }}
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
  return <Layout hasPadding={false}>{page}</Layout>;
};

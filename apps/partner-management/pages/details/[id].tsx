import Layout from '@components/Layout';
import { Title, Box, Stack, Grid, Text } from '@collinsonx/design-system/core';
import { GetServerSideProps } from 'next';
import DetailsView from '@components/Details';
import Error from '@components/Error';
import Notification from '@components/Notification';
import { useMutation, useQuery } from '@collinsonx/utils/apollo';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { getBookingByID } from '@collinsonx/utils/queries';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
import {
  declineBooking as declineBookingMutation,
  confirmBooking as confirmBookingMutation,
} from '@collinsonx/utils/mutations';
import { useRouter } from 'next/router';
import { bookingConfig } from 'config/booking';

interface DetailsProps {
  id: string;
}

const { Initialized } = BookingStatus;

export default function Details({ id }: DetailsProps) {
  const router = useRouter();

  const { loading, error, data } = useQuery<{ getBookingByID: Booking }>(
    getBookingByID,
    {
      variables: { id },
    }
  );

  const [
    declineBooking,
    { loading: loadingDecline, error: errorDecline, data: dataDecline },
  ] = useMutation(declineBookingMutation);

  const [
    confirmBooking,
    { loading: loadingConfirm, error: errorConfirm, data: dataConfirm },
  ] = useMutation(confirmBookingMutation);

  const status = data?.getBookingByID?.status;

  const handleClickConfirm = () => {
    confirmBooking({
      variables: { confirmBookingId: id },
      onCompleted: () => {
        router.push('/');
      },
    });
  };
  const handleClickDecline = () => {
    declineBooking({
      variables: { declineBookingId: id },
      onCompleted: () => {
        router.push('/');
      },
    });
  };

  return (
    <>
      {status && (
        <Notification type={status}>
          {bookingConfig[status].description}
        </Notification>
      )}
      {error ? (
        <Error error={error} />
      ) : (
        <Box py={40} px={32}>
          <Stack spacing={32}>
            <Box>
              <Title mb={8} size={32}>
                Customer booking details
              </Title>
              <Text size={18}>Lounge</Text>
            </Box>
            <Grid>
              <Grid.Col lg={8} md={8}>
                <Box
                  maw={712}
                  p={40}
                  sx={{ borderRadius: 4, border: '1px solid #DDDDDD' }}
                >
                  <DetailsView booking={data?.getBookingByID} loading={loading}>
                    {status === Initialized ? (
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

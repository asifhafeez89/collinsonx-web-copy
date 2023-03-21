import Layout from '@components/Layout';
import bookingsMock from 'bookings.json';
import {
  Title,
  Text,
  Box,
  Flex,
  Stack,
  Grid,
} from '@collinsonx/design-system/core';
import { Pending } from '@collinsonx/design-system/assets/icons';
import BookingButton from '@components/Details/DetailsButton';
import { GetServerSideProps } from 'next';
import DetailsView from '@components/Details';
import Notification from '@components/Notification';
import { useQuery } from '@collinsonx/utils/apollo';
import { Booking, BookingStatus } from '@collinsonx/utils';
import { getBookingByID } from '@collinsonx/utils/queries';
import DetailsPendingActions from '@components/Details/DetailsPendingActions';
const { bookings, lounge } = bookingsMock;

interface DetailsProps {
  id: string;
}

const { Initialized, Confirmed, CheckedIn, Declined } = BookingStatus;

const messageMap: Record<BookingStatus[number], string> = {
  [Initialized]: 'Booking pending',
  [Confirmed]: 'Booking confirmed',
  [CheckedIn]: 'Booking confirmed',
  [Declined]: 'Booking declined',
};

export default function Details({ id }: DetailsProps) {
  const { loading, error, data } = useQuery<{ getBookingByID: Booking }>(
    getBookingByID,
    {
      variables: { id },
    }
  );

  const status = data?.getBookingByID?.status;

  const handleClickDecline = () => {};
  const handleClickConfirm = () => {};

  return (
    <>
      {status && (
        <Notification type={status}>{messageMap[status]}</Notification>
      )}
      <Box py={40} px={32}>
        <Stack spacing={32}>
          <Box>
            <Title mb={8} size={32}>
              Customer booking details
            </Title>
            <Text size={18}>{lounge.name}</Text>
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

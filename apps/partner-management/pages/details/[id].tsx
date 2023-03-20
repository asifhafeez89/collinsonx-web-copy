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
const { bookings, lounge } = bookingsMock;

interface DetailsProps {
  id: string;
}

export default function Details({ id }: DetailsProps) {
  const handleClickDecline = () => {};
  const handleClickConfirm = () => {};
  return (
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
            <DetailsView bookingId={id}>
              <Flex w="100%" justify="flex-end" gap={32}>
                <BookingButton variant="danger" onClick={handleClickDecline}>
                  Decline
                </BookingButton>
                <BookingButton variant="success" onClick={handleClickConfirm}>
                  Confirm
                </BookingButton>
              </Flex>
            </DetailsView>
          </Box>
        </Grid.Col>
      </Grid>
    </Stack>
  );
}

const SubHeader = () => {
  return (
    <Box w="100%" px={40} py={16} bg="#FFF3BF">
      <Flex gap={8} align="center">
        <Pending />
        <Text>Booking pending</Text>
      </Flex>
    </Box>
  );
};

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

Details.getLayout = (page: JSX.Element) => (
  <Layout subHeader={<SubHeader />}>{page}</Layout>
);

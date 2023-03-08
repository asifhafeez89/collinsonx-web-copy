import Layout from '@components/Layout';
import bookingsMock from './bookings.json';
import {
  Title,
  Text,
  Box,
  Flex,
  Stack,
  Grid,
  Button,
} from '@collinsonx/design-system/core';
import {
  Pending,
  Calendar,
  Clock,
} from '@collinsonx/design-system/assets/icons';
import DetailsSection from '@components/DetailsSection';
import DetailsKeyValue from '@components/DetailsKeyValue';
import BookingButton from '@components/DetailsButton';
const { bookings, lounge } = bookingsMock;

export default function Details() {
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
          <Stack
            maw={712}
            spacing={40}
            p={40}
            sx={{ borderRadius: 4, border: '1px solid #DDDDDD' }}
          >
            <DetailsSection label="Passenger details">
              <DetailsKeyValue label="Name">Alyssa Grant</DetailsKeyValue>
              <DetailsKeyValue label="Date of birth">
                01/01/1990
              </DetailsKeyValue>
              <DetailsKeyValue label="Flight details">BA7647</DetailsKeyValue>
            </DetailsSection>
            <DetailsSection label="Booking details">
              <DetailsKeyValue label="Booking date">
                <Flex align="center" gap={8}>
                  <Calendar width={16} height={16} />
                  12/06/2023
                </Flex>
              </DetailsKeyValue>
              <DetailsKeyValue label="Booking time">
                <Flex align="center" gap={8}>
                  <Clock width={16} height={16} />
                  08:00am&nbsp;(GMT)
                </Flex>
              </DetailsKeyValue>
            </DetailsSection>
            <DetailsSection label="Amount of travellers">
              <DetailsKeyValue
                label={
                  <>
                    <Text sx={{ width: '100%' }}>Travellers</Text>
                    <Text>(over the age of 2)</Text>
                  </>
                }
              >
                2
              </DetailsKeyValue>
              <DetailsKeyValue
                label={
                  <>
                    <Text sx={{ width: '100%' }}>Travellers</Text>
                    <Text>(under the age of 2)</Text>
                  </>
                }
              >
                0
              </DetailsKeyValue>
            </DetailsSection>
            <Flex w="100%" justify="flex-end" gap={32}>
              <BookingButton variant="danger" onClick={handleClickDecline}>
                Decline
              </BookingButton>
              <BookingButton variant="success" onClick={handleClickConfirm}>
                Confirm
              </BookingButton>
            </Flex>
          </Stack>
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

Details.getLayout = (page: JSX.Element) => (
  <Layout subHeader={<SubHeader />}>{page}</Layout>
);

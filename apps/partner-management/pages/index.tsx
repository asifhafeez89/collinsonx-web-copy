import Layout from '@components/Layout';
import bookingsMock from './bookings.json';
import { Title, Text } from '@collinsonx/design-system/core';
const { bookings, lounge } = bookingsMock;

export default function Overview() {
  return (
    <>
      <Title mb={8} size={32}>
        Booking overview
      </Title>
      <Text mb={33} size={18}>
        {lounge.name}
      </Text>
    </>
  );
}

Overview.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

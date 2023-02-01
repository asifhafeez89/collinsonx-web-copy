import { Text, Stack, Box } from '@collinsonx/design-system/core';
import BookingEmptyState from '@components/BookingEmptyState';

import Layout from '@components/Layout';

export default function Bookings() {
  return (
    <Box>
      <Text fw={600} pb={12} size={20}>
        Booking management
      </Text>
      <BookingEmptyState />
    </Box>
  );
}

Bookings.getLayout = (page: JSX.Element) => <Layout>{page}</Layout>;

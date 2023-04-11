import { BookingEmptyState as EmptyState } from '@collinsonx/design-system/assets/graphics';
import { Text, Stack, Button } from '@collinsonx/design-system/core';
import Link from 'next/link';

export default function BookingEmptyState() {
  return (
    <Stack align="center" py={24}>
      <EmptyState />
      <Text w={234} align="center">
        You don&apos;t have any trips booked right now
      </Text>
      <Link href="/" style={{ textDecoration: 'none' }}>
        <Button variant="default" my={16} fullWidth>
          Explore lounges
        </Button>
      </Link>
    </Stack>
  );
}

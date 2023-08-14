import { Text, Box, Button } from '@collinsonx/design-system/core';
import router, { useRouter } from 'next/router';

export default function EmptyStateResults() {
  const router = useRouter();
  return (
    <>
      <Text
        mx="auto"
        w={235}
        fw={400}
        align="center"
        color="#000"
        sx={{ fontSize: '18px' }}
      >
        Search by city or airport to find the perfect experience for your trip
      </Text>
      <Button
        onClick={() => {
          router.push('/');
        }}
      >
        Go Back
      </Button>
    </>
  );
}

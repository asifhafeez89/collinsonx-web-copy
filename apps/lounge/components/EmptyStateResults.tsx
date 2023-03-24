import { Text, Box } from '@collinsonx/design-system/core';

import { EmptyStateSearch } from '@collinsonx/design-system/assets/graphics';
export default function EmptyStateResults() {
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
        Search by lounge to find the perfect experience for your trip
      </Text>
      <Box mx="38px" w={263} h={282}>
        <EmptyStateSearch />
      </Box>
    </>
  );
}

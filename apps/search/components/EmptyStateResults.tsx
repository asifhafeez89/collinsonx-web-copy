import { Text, Box } from '@mantine/core';

import { EmptyStateSearch } from '@collinson/design-system/assets/graphics';
export default function EmptyStateResults() {
  return (
    <>
      <Text
        mt={38}
        mx="auto"
        w={235}
        align="center"
        color="#000"
        sx={{ fontSize: '18px' }}
      >
        Search by airport, city or lounge to find the perfect experience for
        your trip
      </Text>
      <Box m="38px" w={263} h={282}>
        <EmptyStateSearch />
      </Box>
    </>
  );
}

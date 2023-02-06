import { Box, Flex, Stack, Title, Text } from '@collinsonx/design-system/core';
import { MapPin, Coffee } from '@collinsonx/design-system/assets/icons';
import ResultsItem from './ResultsItem';
import { LoungeData } from '@collinsonx/utils/types/lounge';

interface ResultsProps {
  data: LoungeData[];
}

export default function Results({ data }: ResultsProps) {
  return (
    <Stack spacing={16} pt={16}>
      <Box>
        <Title order={4} sx={{ fontWeight: 600 }}>
          Airports
        </Title>
        <Box>
          {data.map((item) => (
            <ResultsItem key={item.id} leftIcon={<MapPin />}>
              <Text>{item.location}</Text>
            </ResultsItem>
          ))}
        </Box>
      </Box>
      <Box>
        <Title order={4} sx={{ fontWeight: 600 }}>
          Lounges
        </Title>
        <Box>
          {data.map((item) => (
            <ResultsItem key={`${item.id}`} leftIcon={<Coffee />}>
              <Flex direction="column">
                <Text>{item.name}</Text>
                <Text sx={{ fontWeight: 400 }}>{item.location}</Text>
              </Flex>
            </ResultsItem>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

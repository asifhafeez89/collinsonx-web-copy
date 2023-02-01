import { Box, Flex, Stack, Title, Text } from '@collinsonx/design-system/core';
import { MapPin, Coffee } from '@collinsonx/design-system/assets/icons';
import ResultsItem from './ResultsItem';

type Airport = {
  id: string;
  label: string;
};
type Lounge = {
  id: string;
  label: string;
  airport: Airport;
};

interface ResultsProps {
  data: {
    airports: Airport[];
    lounges: Lounge[];
  };
}

export default function Results({ data }: ResultsProps) {
  return (
    <Stack spacing={16} pt={16}>
      <Box>
        <Title order={4} sx={{ fontWeight: 600 }}>
          Airports
        </Title>
        <Box>
          {data.airports.map((item) => (
            <ResultsItem key={item.id} leftIcon={<MapPin />}>
              <Text>{item.label}</Text>
            </ResultsItem>
          ))}
        </Box>
      </Box>
      <Box>
        <Title order={4} sx={{ fontWeight: 600 }}>
          Lounges
        </Title>
        <Box>
          {data.lounges.map((item) => (
            <ResultsItem
              key={`${item.id}_${item.airport.id}`}
              leftIcon={<Coffee />}
            >
              <Flex direction="column">
                <Text>{item.label}</Text>
                <Text sx={{ fontWeight: 400 }}>{item.airport.label}</Text>
              </Flex>
            </ResultsItem>
          ))}
        </Box>
      </Box>
    </Stack>
  );
}

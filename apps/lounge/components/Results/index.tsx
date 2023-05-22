import { Box, Flex, Title, Text } from '@collinsonx/design-system/core';
import { Coffee } from '@collinsonx/design-system/assets/icons';
import ResultsItem from './ResultsItem';
import { Experience } from '@collinsonx/utils/generatedTypes/graphql';

interface ResultsProps {
  data: Experience[];
  onClick: (id: string) => void;
}

export default function Results({ data, onClick }: ResultsProps) {
  return (
    <Box pt={16}>
      <Title order={4} sx={{ fontWeight: 600 }}>
        Lounges
      </Title>
      <Box>
        {data.map((item) => (
          <ResultsItem
            key={`${item.id}`}
            leftIcon={<Coffee />}
            onClick={() => onClick && onClick(item.id)}
          >
            <Flex direction="column">
              <Text>{item.loungeName}</Text>
              <Text sx={{ fontWeight: 400 }}>{item.location?.city}</Text>
            </Flex>
          </ResultsItem>
        ))}
      </Box>
    </Box>
  );
}

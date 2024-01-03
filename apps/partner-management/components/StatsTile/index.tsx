import styled from '@collinsonx/design-system/styled';
import { Flex, Text } from '@collinsonx/design-system/core';

const Tile = styled('div')`
  width: 100%;
  padding: 16px 24px;
  border: 1px solid #c8c9ca;
  border-radius: 8px;
`;

export interface StatsTileProps {
  label: string;
  value: string | number;
}
const StatsTile = ({ label, value }: StatsTileProps) => {
  return (
    <Tile>
      <Flex color="dark.6" direction="column">
        <Text>{label}</Text>
        <Text size="xl" fw={600}>
          {value}
        </Text>
      </Flex>
    </Tile>
  );
};

export default StatsTile;

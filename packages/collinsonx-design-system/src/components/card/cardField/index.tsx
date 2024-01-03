import { Flex, Text } from '@mantine/core';
import { ReactNode } from 'react';
import colors from '../../../colour-constants-partner';

export interface CardFieldProps {
  label: string;
  children: ReactNode;
}

const CardField = ({ label, children }: CardFieldProps) => {
  return (
    <Flex gap={4} direction="column">
      <Text color={colors['text-grey']} size="xs">
        {label}
      </Text>
      {children}
    </Flex>
  );
};

export default CardField;

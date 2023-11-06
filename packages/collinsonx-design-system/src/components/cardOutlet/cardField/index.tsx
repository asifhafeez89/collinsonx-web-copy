import { Flex, Text } from '@mantine/core';
import { ReactNode } from 'react';
import colors from '../../../colour-constants-partner';

export interface CardFieldProps {
  label: string;
  children: ReactNode;
}

const CardField = ({ label, children }: CardFieldProps) => {
  return (
    <Flex aria-label={label} gap={4} direction="column">
      <Text color={colors['partner-text-grey']} size={12}>
        {label}
      </Text>
      {children}
    </Flex>
  );
};

export default CardField;

import { ReactNode } from 'react';
import { Text } from '@mantine/core';
import colors from '../../../colour-constants-partner';

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Text
      component="h2"
      my={0}
      weight={600}
      size={20}
      color={colors['partner-text-default']}
      sx={{ lineHeight: '25.3px' }}
    >
      {children}
    </Text>
  );
}

export default CardTitle;

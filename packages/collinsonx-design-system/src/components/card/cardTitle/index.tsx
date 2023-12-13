import { ReactNode } from 'react';
import colors from '../../../colour-constants-partner';
import Title from '../../title';

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <Title
      order={2}
      my={0}
      weight={600}
      size={20}
      color={colors['partner-text-default']}
      sx={{ lineHeight: '25.3px' }}
    >
      {children}
    </Title>
  );
}

export default CardTitle;

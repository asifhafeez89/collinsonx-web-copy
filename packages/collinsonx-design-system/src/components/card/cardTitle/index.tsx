import { ReactNode } from 'react';
import colors from '../../../colour-constants-partner';
import Title from '../../title';

export interface CardTitleProps {
  onClick?: () => void;
  children?: ReactNode;
  'data-testid'?: string;
}

function CardTitle({ children, 'data-testid': dataTestId }: CardTitleProps) {
  return (
    <Title
      data-testid={dataTestId}
      order={2}
      my={0}
      weight={600}
      size={20}
      color={colors['text-default']}
      sx={{ lineHeight: '25.3px' }}
    >
      {children}
    </Title>
  );
}

export default CardTitle;

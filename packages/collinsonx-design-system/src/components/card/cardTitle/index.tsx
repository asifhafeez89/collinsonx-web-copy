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
      size={20}
      style={{
        lineHeight: '25.3px',
        fontWeight: 600,
        color: colors['text-default'],
      }}
    >
      {children}
    </Title>
  );
}

export default CardTitle;

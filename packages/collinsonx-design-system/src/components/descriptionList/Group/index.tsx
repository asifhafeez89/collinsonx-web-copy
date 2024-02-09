import { ReactNode } from 'react';
import { Box } from '@mantine/core';

export interface GroupProps {
  children: ReactNode | ReactNode[];
  'data-testid'?: string;
  className?: string;
  fw?: boolean;
}
const Group = ({
  fw,
  children,
  'data-testid': dataTestId,
  className,
}: GroupProps) => {
  return (
    <Box
      w={fw ? '100%' : undefined}
      data-testid={dataTestId}
      className={className}
    >
      {children}
    </Box>
  );
};

export default Group;

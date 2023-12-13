import colors from '@collinsonx/design-system/colour-constants-partner';
import { Box, Sx } from '@collinsonx/design-system/core';
import { ReactNode } from 'react';

interface ContentWrapperProps {
  children: ReactNode;
  sx?: Sx;
}

const ContentWrapper = ({ children, sx }: ContentWrapperProps) => {
  return (
    <Box
      sx={(theme) => ({
        padding: 24,
        [theme.fn.smallerThan('md')]: {
          padding: 16,
        },
        backgroundColor: colors['partner-bg-surface'],
        height: '100%',
        ...sx,
      })}
    >
      {children}
    </Box>
  );
};

export default ContentWrapper;

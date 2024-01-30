import { Box } from '@collinsonx/design-system/core';
import { PropsWithChildren } from 'react';

import classes from './Section.module.css';
import clsx from 'clsx';

export interface SectionProps extends PropsWithChildren {
  className?: string;
  margin?: boolean;
  expandSection?: boolean;
}
const Section = ({
  children,
  className,
  margin = true,
  expandSection,
}: SectionProps) => {
  return (
    <Box
      className={clsx([
        classes.section,
        { [classes.margin]: margin },
        { [classes.expandSection]: expandSection },
        className,
      ])}
    >
      {children}
    </Box>
  );
};

export default Section;

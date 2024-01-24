import { Box } from '@collinsonx/design-system/core';
import { FC, PropsWithChildren } from 'react';

import classes from './Section.module.css';
import clsx from 'clsx';

const Section: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => {
  return <Box className={clsx([classes.section, className])}>{children}</Box>;
};

export default Section;

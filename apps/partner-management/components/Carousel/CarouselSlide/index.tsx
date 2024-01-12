import { Box } from '@collinsonx/design-system/core';
import { FC, PropsWithChildren } from 'react';

import classes from './CarouselSlide.module.css';

const Slide: FC<PropsWithChildren> = ({ children }) => (
  <Box className={classes.emblaSlide}>{children}</Box>
);

export default Slide;

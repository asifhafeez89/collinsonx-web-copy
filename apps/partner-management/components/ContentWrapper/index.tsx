import { PropsWithChildren, FC } from 'react';
import { Box } from '@collinsonx/design-system/core';
import classes from './ContentWrapper.module.css';

const ContentWrapper: FC<PropsWithChildren> = ({ children }) => (
  <Box className={classes.contentWrapper}>{children}</Box>
);

export default ContentWrapper;

import { FC, PropsWithChildren } from 'react';
import { Box } from '@collinsonx/design-system/core';
import classes from './FormContainer.module.css';

const FormContainer: FC<PropsWithChildren> = ({ children }) => (
  <Box className={classes.container} data-testid="FormContainer">
    {children}
  </Box>
);

export default FormContainer;

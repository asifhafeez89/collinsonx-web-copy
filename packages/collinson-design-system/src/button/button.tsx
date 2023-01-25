import React from 'react';
import { Button } from '@mantine/core';

import './button.css';

/**
 * Primary UI component for user interaction
 */
export const CLButton = ({
  ...props
}) => {
  return (
    <Button {...props} />
  );
};

import React from 'react';
import { Button as MantineButton } from '@mantine/core';

import './button.css';

/**
 * Primary UI component for user interaction
 */
export default function Button({ ...props }) {
  return <MantineButton {...props} />;
}

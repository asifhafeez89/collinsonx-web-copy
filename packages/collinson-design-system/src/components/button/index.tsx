import React from 'react';
import { Button as MantineButton, ButtonProps as MantineBProps } from '@mantine/core';

import Bell from '../../assets/icons/bell.svg';

interface ButtonProps {
  useIcon: Boolean,
  props: MantineBProps,
  children?:  string
}

/**
 * Primary UI component for user interaction
 */
export default function Button({ useIcon,  ...props }: ButtonProps) {
  return (
    <>
      <MantineButton {...props} leftIcon={useIcon && <Bell />} />
    </>
  );
}

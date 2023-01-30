import React from 'react';
import { Button as MantineButton, ButtonProps as MantineBProps } from '@mantine/core';

import Bell from '../../assets/icons/bell.svg';

interface ButtonProps extends MantineBProps{
  useIcon: Boolean,
  handleClick: () => void;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({ 
    useIcon, 
    handleClick,
     ...props 
}: ButtonProps) {
  return (
    <>
      <MantineButton {...props} leftIcon={useIcon && <Bell />}  onClick={handleClick} />
    </>
  );
}

import React from 'react';
import {
  Button as MantineButton,
  ButtonProps as MantineBProps,
} from '@mantine/core';

interface ButtonProps extends MantineBProps {
  handleClick?: () => void;
  icon?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export default function Button({ handleClick, icon, ...props }: ButtonProps) {
  return (
    <>
      <MantineButton {...props} leftIcon={icon && icon} onClick={handleClick} />
    </>
  );
}

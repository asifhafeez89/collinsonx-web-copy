import React from 'react';
import {
  Button as MantineButton,
  ButtonProps as MantineBProps,
} from '@mantine/core';
import styled from '../../styled';

interface ButtonProps extends MantineBProps {
  handleClick?: () => void;
  icon?: React.ReactNode;
  spacing?: string;
  align?: 'left' | 'center' | 'right';
}

/**
 * Primary UI component for user interaction
 */
export default function Button({
  handleClick,
  icon,
  spacing = '0px',
  align = 'left',
  ...props
}: ButtonProps) {
  return (
    <div style={{ padding: spacing, textAlign: align }}>
      <MantineButton {...props} leftIcon={icon && icon} onClick={handleClick} />
    </div>
  );
}

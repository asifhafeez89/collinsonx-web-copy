import React from 'react';
import { Button as MantineButton } from '@mantine/core';
import Bell from '../../assets/icons/bell.svg';

/**
 * Primary UI component for user interaction
 */
export default function Button({ ...props }) {
  return (
    <>
      <MantineButton {...props} leftIcon={<Bell />} />
    </>
  );
}

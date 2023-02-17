import React from 'react';
import { SelectProps, Select } from '@collinsonx/utils/core';

/**
 * Primary UI component for user interaction
 */
export default function SelectInput({ ...props }: SelectProps) {
  return (
    <>
      <Select {...props} styles={{ label: { color: '#000000' } }} />
    </>
  );
}

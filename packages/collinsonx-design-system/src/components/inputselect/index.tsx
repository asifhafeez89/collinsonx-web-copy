import React from 'react';
import { SelectProps, Select } from '@mantine/core';

export default function SelectInput({ ...props }: SelectProps) {
  return (
    <>
      <Select
        {...props}
        styles={{ label: { color: '#000000', fontWeight: 600 } }}
      />
    </>
  );
}
